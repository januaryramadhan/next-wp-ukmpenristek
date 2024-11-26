import querystring from "query-string";
import {
  Post,
  Category,
  Tag,
  Page,
  Author,
  FeaturedMedia,
} from "./wordpress";

// WordPress Config
const baseUrl = process.env.WORDPRESS_URL;

// Revalidation times
export const REVALIDATE_TIMES = {
  NEVER: false,
  MINUTE: 60,
  HOUR: 3600,
  DAY: 86400,
  WEEK: 604800,
  MONTH: 2592000,
} as const;

// Helper functions
function getUrl(path: string, query?: Record<string, any>) {
  const params = query ? querystring.stringify(query) : null;
  return `${baseUrl}${path}${params ? `?${params}` : ""}`;
}

async function fetchWithRevalidate<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: REVALIDATE_TIMES.DAY }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${url}`);
  }
  
  return response.json();
}

// Posts
export async function getAllPosts(filterParams?: {
  author?: string;
  tag?: string;
  category?: string;
}): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", {
    author: filterParams?.author,
    tags: filterParams?.tag,
    categories: filterParams?.category,
  });
  return fetchWithRevalidate<Post[]>(url);
}

export async function getPostById(id: number): Promise<Post> {
  const url = getUrl(`/wp-json/wp/v2/posts/${id}`);
  return fetchWithRevalidate<Post>(url);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const url = getUrl("/wp-json/wp/v2/posts", { slug });
  const posts = await fetchWithRevalidate<Post[]>(url);
  return posts[0];
}

// Categories
export async function getAllCategories(): Promise<Category[]> {
  const url = getUrl("/wp-json/wp/v2/categories");
  return fetchWithRevalidate<Category[]>(url);
}

export async function getCategoryById(id: number): Promise<Category> {
  const url = getUrl(`/wp-json/wp/v2/categories/${id}`);
  return fetchWithRevalidate<Category>(url);
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  const url = getUrl("/wp-json/wp/v2/categories", { slug });
  const categories = await fetchWithRevalidate<Category[]>(url);
  return categories[0];
}

export async function getPostsByCategory(categoryId: number): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { categories: categoryId });
  return fetchWithRevalidate<Post[]>(url);
}

// Tags
export async function getAllTags(): Promise<Tag[]> {
  const url = getUrl("/wp-json/wp/v2/tags");
  return fetchWithRevalidate<Tag[]>(url);
}

export async function getTagById(id: number): Promise<Tag> {
  const url = getUrl(`/wp-json/wp/v2/tags/${id}`);
  return fetchWithRevalidate<Tag>(url);
}

export async function getTagBySlug(slug: string): Promise<Tag> {
  const url = getUrl("/wp-json/wp/v2/tags", { slug });
  const tags = await fetchWithRevalidate<Tag[]>(url);
  return tags[0];
}

export async function getPostsByTag(tagId: number): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { tags: tagId });
  return fetchWithRevalidate<Post[]>(url);
}

export async function getTagsByPost(postId: number): Promise<Tag[]> {
  const url = getUrl("/wp-json/wp/v2/tags", { post: postId });
  return fetchWithRevalidate<Tag[]>(url);
}

// Pages
export async function getAllPages(): Promise<Page[]> {
  const url = getUrl("/wp-json/wp/v2/pages");
  return fetchWithRevalidate<Page[]>(url);
}

export async function getPageById(id: number): Promise<Page> {
  const url = getUrl(`/wp-json/wp/v2/pages/${id}`);
  return fetchWithRevalidate<Page>(url);
}

export async function getPageBySlug(slug: string): Promise<Page> {
  const url = getUrl("/wp-json/wp/v2/pages", { slug });
  const pages = await fetchWithRevalidate<Page[]>(url);
  return pages[0];
}

// Authors
export async function getAllAuthors(): Promise<Author[]> {
  const url = getUrl("/wp-json/wp/v2/users");
  return fetchWithRevalidate<Author[]>(url);
}

export async function getAuthorById(id: number): Promise<Author> {
  const url = getUrl(`/wp-json/wp/v2/users/${id}`);
  return fetchWithRevalidate<Author>(url);
}

export async function getAuthorBySlug(slug: string): Promise<Author> {
  const url = getUrl("/wp-json/wp/v2/users", { slug });
  const authors = await fetchWithRevalidate<Author[]>(url);
  return authors[0];
}

// Posts by various criteria
export async function getPostsByAuthor(authorId: number): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { author: authorId });
  return fetchWithRevalidate<Post[]>(url);
}

export async function getPostsByAuthorSlug(authorSlug: string): Promise<Post[]> {
  const author = await getAuthorBySlug(authorSlug);
  const url = getUrl("/wp-json/wp/v2/posts", { author: author.id });
  return fetchWithRevalidate<Post[]>(url);
}

export async function getPostsByCategorySlug(categorySlug: string): Promise<Post[]> {
  const category = await getCategoryBySlug(categorySlug);
  const url = getUrl("/wp-json/wp/v2/posts", { categories: category.id });
  return fetchWithRevalidate<Post[]>(url);
}

export async function getPostsByTagSlug(tagSlug: string): Promise<Post[]> {
  const tag = await getTagBySlug(tagSlug);
  const url = getUrl("/wp-json/wp/v2/posts", { tags: tag.id });
  return fetchWithRevalidate<Post[]>(url);
}

// Media
export async function getFeaturedMediaById(id: number): Promise<FeaturedMedia> {
  const url = getUrl(`/wp-json/wp/v2/media/${id}`);
  return fetchWithRevalidate<FeaturedMedia>(url);
}