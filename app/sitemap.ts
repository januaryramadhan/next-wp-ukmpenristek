import { MetadataRoute } from "next";
import { getClient } from "@/libs/config/wordpress/apollo-client";
import { GET_ALL_POSTS } from "@/libs/graphql";
import { siteConfig } from "@/site.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.site_domain}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${siteConfig.site_domain}/posts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.site_domain}/profil-ukm`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.site_domain}/program-kerja`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.site_domain}/dokumentasi`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.site_domain}/posts/authors`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.site_domain}/posts/categories`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.site_domain}/posts/tags`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  try {
    // Fetch posts directly using Apollo Client
    const { data } = await getClient().query({
      query: GET_ALL_POSTS,
      variables: {
        first: 100, // Adjust this number based on your needs
      },
    });

    // Safely access posts from the GraphQL response
    const posts = data?.posts?.nodes || [];

    const postUrls: MetadataRoute.Sitemap = posts.map((post: any) => ({
      url: `${siteConfig.site_domain}/posts/${post.slug}`,
      lastModified: new Date(post.modified || new Date()),
      changeFrequency: "weekly",
      priority: 0.5,
    }));

    return [...staticUrls, ...postUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static URLs if there's an error fetching posts
    return staticUrls;
  }
}