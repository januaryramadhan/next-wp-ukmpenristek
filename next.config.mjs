import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    NOTION_ANGGOTA_DB: process.env.NOTION_ANGGOTA_DB,
    NOTION_PROKER_DB: process.env.NOTION_PROKER_DB,
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
        hostname:
          process.env.WORDPRESS_HOSTNAME ||
          "bisque-duck-758265.hostingersite.com", // Fallback value
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
