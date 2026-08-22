const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Ensure markdown content files are bundled into the production deployment
  // so the /api/markdown route handler can read them at runtime.
  outputFileTracingIncludes: {
    "/api/markdown/**": ["./content/**/*.md"],
  },
  // Advertise `Vary: Accept` on every HTML response so caches never serve a
  // cached HTML variant to an agent that asked for text/markdown (and vice
  // versa). Required for acceptmarkdown.com-compliant content negotiation;
  // middleware-set Vary does not survive onto static page responses.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Vary", value: "Accept" }],
      },
    ];
  },
};

export default nextConfig;
