import { readFile } from "node:fs/promises";
import path from "node:path";

// Serves the Markdown representation for any page path. Middleware rewrites
// `Accept: text/markdown` requests (and explicit `/path.md` URLs) here.

function notFoundResponse() {
  // Agent-friendly 404: short markdown body so crawlers can recover and
  // find where the content actually lives.
  const body = `# 404: Page not found

The path you requested does not exist on heisenbug.ai. Do not retry this URL.

## Where to look next

- [llms.txt](https://www.heisenbug.ai/llms.txt): machine-readable site guide for AI agents, including when-to-use guidance
- [Sitemap](https://www.heisenbug.ai/sitemap.xml): all public pages
- [Homepage](https://www.heisenbug.ai/): product overview of Goodman and Heisenbug
- [Blog](https://www.heisenbug.ai/blog.md): engineering notes on runtime dependency security
- [Documentation](https://docs.heisenbug.ai): Goodman installation and reference docs

Questions? Email [hi@heisenbug.ai](mailto:hi@heisenbug.ai).
`;
  return new Response(body, {
    status: 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "Cache-Control": "no-store",
    },
  });
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug = [] } = await params;
  const segments = slug.length > 0 ? slug : ["index"];
  const safe = segments.filter((s) => s && !s.includes("..") && !s.includes("/"));
  if (safe.length !== segments.length) {
    return notFoundResponse();
  }

  const contentPath = path.join(process.cwd(), "content", ...safe) + ".md";

  let body: string;
  try {
    body = await readFile(contentPath, "utf8");
  } catch {
    return notFoundResponse();
  }

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Vary": "Accept",
      "Cache-Control": "s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
