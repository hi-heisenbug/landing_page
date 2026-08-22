import { readFile } from "node:fs/promises";
import path from "node:path";

// Serves the Markdown representation for any page path. Middleware rewrites
// `Accept: text/markdown` requests (and explicit `/path.md` URLs) here.

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug = [] } = await params;
  const segments = slug.length > 0 ? slug : ["index"];
  const safe = segments.filter((s) => s && !s.includes("..") && !s.includes("/"));
  if (safe.length !== segments.length) {
    return new Response("Not found", { status: 404, headers: { Vary: "Accept" } });
  }

  const contentPath = path.join(process.cwd(), "content", ...safe) + ".md";

  let body: string;
  try {
    body = await readFile(contentPath, "utf8");
  } catch {
    return new Response("Not found", { status: 404, headers: { Vary: "Accept" } });
  }

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Vary": "Accept",
      "Cache-Control": "s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
