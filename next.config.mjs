/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emits .next/standalone with server.js and a pruned node_modules, so the
  // runtime image ships only what it needs instead of the full dependency tree.
  output: 'standalone',
  outputFileTracingRoot: import.meta.dirname,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
