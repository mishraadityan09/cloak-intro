import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This app is self-contained (its own package-lock). Pin the root so Next doesn't infer the
  // monorepo root from the parent lockfile.
  turbopack: { root: __dirname },
};

export default nextConfig;
