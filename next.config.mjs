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
    NOTION_ABSEN_DB: process.env.NOTION_ABSEN_DB, // Tambahkan ini
    WORDPRESS_GRAPHQL_ENDPOINT: process.env.WORDPRESS_GRAPHQL_ENDPOINT || "https://bisque-duck-758265.hostingersite.com/graphql",
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
  async headers() {
    return [
      {
        source: '/sertifikat/:id',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=59',
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);