import { getClient } from "../config/wordpress/apollo-client";
import { 
  GET_ALL_POSTS, 
  GET_POST_BY_SLUG,
  GET_ALL_PAGES,
  GET_PAGE_BY_SLUG,
  GET_ALL_AUTHORS,
  GET_AUTHOR_BY_SLUG,
  GET_ALL_CATEGORIES,
  GET_CATEGORY_BY_SLUG,
  GET_ALL_TAGS,
  GET_TAG_BY_SLUG,
  GET_RELATED_POSTS
} from "../graphql";

// Posts
export async function getAllPosts(first: number = 100, after: string | null = null) {
    try {
      const { data } = await getClient().query({
        query: GET_ALL_POSTS,
        variables: { first, after },
        context: {
          fetchOptions: {
            next: { revalidate: 300 } // 5 minutes
          }
        }
      });
      return data.posts;
    } catch (error) {
      console.error('Error fetching all posts:', error);
      throw new Error('Failed to fetch posts');
    }
  }
  
export async function getPostBySlug(slug: string) {
  try {
    const { data } = await getClient().query({
      query: GET_POST_BY_SLUG,
      variables: { slug },
      context: {
        fetchOptions: {
          next: { revalidate: 300 } // 5 minutes
        }
      }
    });
    return data.post;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    throw new Error('Failed to fetch post');
  }
}

// Pages
export async function getAllPages() {
  try {
    const { data } = await getClient().query({
      query: GET_ALL_PAGES,
      context: {
        fetchOptions: {
          next: { revalidate: 3600 } // 1 hour
        }
      }
    });
    return data.pages.nodes;
  } catch (error) {
    console.error('Error fetching all pages:', error);
    throw new Error('Failed to fetch pages');
  }
}

export async function getPageBySlug(slug: string) {
  try {
    const { data } = await getClient().query({
      query: GET_PAGE_BY_SLUG,
      variables: { slug },
      context: {
        fetchOptions: {
          next: { revalidate: 3600 } // 1 hour
        }
      }
    });
    return data.page;
  } catch (error) {
    console.error(`Error fetching page with slug ${slug}:`, error);
    throw new Error('Failed to fetch page');
  }
}

// Authors
export async function getAllAuthors() {
  try {
    const { data } = await getClient().query({
      query: GET_ALL_AUTHORS,
      context: {
        fetchOptions: {
          next: { revalidate: 3600 } // 1 hour
        }
      }
    });
    return data.users.nodes;
  } catch (error) {
    console.error('Error fetching all authors:', error);
    throw new Error('Failed to fetch authors');
  }
}

export async function getAuthorBySlug(slug: string) {
  try {
    const { data } = await getClient().query({
      query: GET_AUTHOR_BY_SLUG,
      variables: { slug },
      context: {
        fetchOptions: {
          next: { revalidate: 300 } // 5 minutes
        }
      }
    });
    return data.user;
  } catch (error) {
    console.error(`Error fetching author with slug ${slug}:`, error);
    throw new Error('Failed to fetch author');
  }
}

// Categories
export async function getAllCategories() {
  try {
    const { data } = await getClient().query({
      query: GET_ALL_CATEGORIES,
      context: {
        fetchOptions: {
          next: { revalidate: 3600 } // 1 hour
        }
      }
    });
    return data.categories.nodes;
  } catch (error) {
    console.error('Error fetching all categories:', error);
    throw new Error('Failed to fetch categories');
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    const { data } = await getClient().query({
      query: GET_CATEGORY_BY_SLUG,
      variables: { slug },
      context: {
        fetchOptions: {
          next: { revalidate: 300 } // 5 minutes
        }
      }
    });
    return data.category;
  } catch (error) {
    console.error(`Error fetching category with slug ${slug}:`, error);
    throw new Error('Failed to fetch category');
  }
}

// Tags
export async function getAllTags() {
  try {
    const { data } = await getClient().query({
      query: GET_ALL_TAGS,
      context: {
        fetchOptions: {
          next: { revalidate: 3600 } // 1 hour
        }
      }
    });
    return data.tags.nodes;
  } catch (error) {
    console.error('Error fetching all tags:', error);
    throw new Error('Failed to fetch tags');
  }
}

export async function getTagBySlug(slug: string) {
  try {
    const { data } = await getClient().query({
      query: GET_TAG_BY_SLUG,
      variables: { slug },
      context: {
        fetchOptions: {
          next: { revalidate: 300 } // 5 minutes
        }
      }
    });
    return data.tag;
  } catch (error) {
    console.error(`Error fetching tag with slug ${slug}:`, error);
    throw new Error('Failed to fetch tag');
  }
}

// Related Posts
export async function getRelatedPosts(categoryIds: string[], excludeId: string, limit: number = 3) {
  try {
    const { data } = await getClient().query({
      query: GET_RELATED_POSTS,
      variables: { 
        categoryIn: categoryIds, 
        notIn: [excludeId],
        first: limit 
      },
      context: {
        fetchOptions: {
          next: { revalidate: 300 } // 5 minutes
        }
      }
    });
    return data.posts.nodes;
  } catch (error) {
    console.error('Error fetching related posts:', error);
    throw new Error('Failed to fetch related posts');
  }
}