import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    domains: [
      "storage.tally.so",
      "prod-files-secure.s3.us-west-2.amazonaws.com",
      "s3.us-west-2.amazonaws.com",
      "bisque-duck-758265.hostingersite.com",
    ],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.WORDPRESS_HOSTNAME || "bisque-duck-758265.hostingersite.com", // Fallback value
        port: "",
        pathname: "/**",
      },
    ],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);