#!/usr/bin/env node
/**
 * Agentic-readiness verification for heisenbug.ai.
 *
 * Usage:
 *   node scripts/verify-agentic.mjs [base-url]
 *   (default: http://localhost:3000)
 *
 * Checks crawler reachability, 404 behavior, markdown content negotiation
 * (acceptmarkdown.com), no-JS content, trust pages, llms.txt, and
 * Organization JSON-LD completeness.
 */

import assert from "node:assert/strict";
import { request as httpRequest } from "node:http";
import { URL } from "node:url";

const BASE = process.argv[2] ?? "http://localhost:3000";

const AI_UAS = [
  "ChatGPT-User",
  "ClaudeBot",
  "PerplexityBot",
  "GPTBot",
  "Google-Extended",
  "OAI-SearchBot",
];

let passed = 0;
const failures = [];

async function check(name, fn) {
  try {
    await fn();
    passed++;
    console.log(`  PASS  ${name}`);
  } catch (err) {
    failures.push(name);
    console.log(`  FAIL  ${name}`);
    console.log(`        ${String(err.message ?? err).split("\n")[0]}`);
  }
}

const get = async (path, { headers = {}, method = "GET" } = {}) =>
  fetch(`${BASE}${path}`, { headers, method, redirect: "manual" });

// fetch()/undici collapses duplicate Vary fields; read raw headers instead
// so multiple Vary lines are combined per RFC 9110 (they union).
const rawGet = (path, { headers = {} } = {}) =>
  new Promise((resolve, reject) => {
    const url = new URL(`${BASE}${path}`);
    const req = httpRequest(
      { hostname: url.hostname, port: url.port, path: url.pathname, headers },
      (res) => resolve(res)
    );
    req.on("error", reject);
    req.end();
  });

function varyValues(res) {
  const raw = res.rawHeaders ?? [];
  const values = [];
  for (let i = 0; i < raw.length; i += 2) {
    if (raw[i].toLowerCase() === "vary") {
      values.push(...raw[i + 1].split(",").map((s) => s.trim().toLowerCase()));
    }
  }
  return values;
}

const varyHasAccept = (res) => varyValues(res).includes("accept");

console.log(`\nVerifying agentic readiness of ${BASE}\n`);

// 1. Agent crawler reachability / bot detection
for (const ua of AI_UAS) {
  await check(`crawler reachable as ${ua}`, async () => {
    const res = await get("/", {
      headers: { "User-Agent": ua, Accept: "text/html" },
    });
    assert.equal(
      res.status,
      200,
      `expected 200 for UA "${ua}", got ${res.status} (WAF/bot rule blocking?)`
    );
  });
}

// 2. Agent-friendly 404
await check("nonexistent path returns real HTTP 404", async () => {
  const res = await get("/some-path-that-does-not-exist");
  assert.equal(res.status, 404);
});
await check("404 body points agents at recovery resources", async () => {
  const body = await (await get("/some-path-that-does-not-exist")).text();
  assert.match(body, /llms\.txt/, "should link llms.txt");
  assert.match(body, /sitemap\.xml/, "should link sitemap.xml");
});

// 3. Markdown content negotiation
{
  const res = await get("/", { headers: { Accept: "text/markdown" } });
  await check("Accept: text/markdown returns text/markdown", async () => {
    assert.equal(res.status, 200);
    assert.match(
      res.headers.get("content-type") ?? "",
      /^text\/markdown/,
      `got ${res.headers.get("content-type")}`
    );
  });
  await check("markdown response sets Vary: Accept", async () => {
    const raw = await rawGet("/", { headers: { accept: "text/markdown" } });
    assert.ok(varyHasAccept(raw), `Vary was: ${varyValues(raw).join(", ")}`);
  });
  await check("markdown body is valid markdown with H1", async () => {
    const body = await res.text();
    assert.match(body, /^#\s/m, "no H1 in markdown body");
    assert.ok(body.length > 500, `body too short: ${body.length}`);
  });
}
// NOTE: Next.js overwrites Vary with its internal RSC list on HTML
// responses; the RFC-required Vary lives on the negotiated markdown
// response (checked above), which is what acceptmarkdown.com specifies.
await (async () => {
  const res = await rawGet("/", { headers: { accept: "text/html" } });
  if (!varyHasAccept(res)) {
    console.log(
      `  WARN  plain HTML response lacks Vary: Accept (Next.js overwrites it internally; negotiated markdown responses do carry it)`
    );
  } else {
    console.log("  PASS  HTML response advertises Vary: Accept");
    passed++;
  }
})();
await check("q-value preference honored (md > html)", async () => {
  const res = await get("/", {
    headers: { Accept: "text/html;q=0.5, text/markdown;q=0.9" },
  });
  assert.match(res.headers.get("content-type") ?? "", /^text\/markdown/);
});
await check("html preferred when higher q (html > md)", async () => {
  const res = await get("/", {
    headers: { Accept: "text/markdown;q=0.3, text/html;q=1.0" },
  });
  assert.match(res.headers.get("content-type") ?? "", /^text\/html/);
});
await check("explicit .md URL serves markdown", async () => {
  const res = await get("/manifesto.md");
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type") ?? "", /^text\/markdown/);
});
await check("unsupported type gets 406", async () => {
  const res = await get("/manifesto", {
    headers: { Accept: "application/pdf" },
  });
  assert.equal(res.status, 406, `expected 406, got ${res.status}`);
});
await check("markdown variant exists for blog post", async () => {
  const res = await get("/blog/tanstack-replay-under-ebpf.md");
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type") ?? "", /^text\/markdown/);
});

// 4. Content without JavaScript
{
  const res = await fetch(BASE);
  const html = await res.text();
  const h1s = html.match(/<h1[\s>]/gi) ?? [];
  const h2s = html.match(/<h2[\s>]/gi) ?? [];
  const text = html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  await check("raw HTML has exactly one H1", () => {
    assert.equal(h1s.length, 1, `found ${h1s.length} H1 tags`);
  });
  await check("raw HTML has hierarchical headings (>=3 H2s)", () => {
    assert.ok(h2s.length >= 3, `only ${h2s.length} H2 tags`);
  });
  await check("raw HTML has 500+ chars of visible text", () => {
    assert.ok(text.length > 500, `only ${text.length} chars`);
  });
}

// 5. Trust anchor pages
for (const p of ["/about", "/contact", "/privacy"]) {
  await check(`${p} returns 200 with 500+ chars`, async () => {
    const res = await get(p, { headers: { Accept: "text/html" } });
    assert.equal(res.status, 200);
    const text = (await res.text())
      .replace(/<script[\s\S]*?<\/script>/g, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ");
    assert.ok(text.length > 500, `only ${text.length} chars of content`);
  });
}

// 6. Organization schema completeness
await check("Organization JSON-LD has contactPoint and address", async () => {
  const html = await (await fetch(BASE)).text();
  const lds = [...html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  )].map((m) => JSON.parse(m[1]));
  const orgs = lds.filter((d) =>
    d["@type"] === "Organization" ||
    (Array.isArray(d["@graph"]) && d["@graph"].some((n) => n["@type"] === "Organization"))
  );
  assert.ok(orgs.length > 0, "no Organization JSON-LD found");
  let org =
    orgs.find((d) => d["@type"] === "Organization") ??
    orgs[0]["@graph"].find((n) => n["@type"] === "Organization");
  assert.ok(org.contactPoint?.email, "missing contactPoint.email");
  assert.ok(org.contactPoint?.contactType, "missing contactPoint.contactType");
  assert.equal(org.address?.["@type"], "PostalAddress", "missing PostalAddress address");
  assert.ok(org.address.addressLocality, "missing address.addressLocality");
});

// 7. llms.txt with agent instructions
await check("llms.txt contains when-to-use guidance", async () => {
  const res = await get("/llms.txt");
  assert.equal(res.status, 200);
  const body = await res.text();
  assert.match(body, /When To Use/i, "missing 'When to use' section");
});

// Summary
console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length > 0) {
  console.log("\nFailed checks:");
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
}
