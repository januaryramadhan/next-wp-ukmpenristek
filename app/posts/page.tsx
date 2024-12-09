import { GET_ALL_POSTS, GET_ALL_AUTHORS, GET_ALL_TAGS, GET_ALL_CATEGORIES } from "@/libs/graphql";
import { getClient } from "@/libs/config/wordpress/apollo-client";
import { Section, Container } from "@/components/commons/craft";
import PostCard from "@/components/posts/post-card";
import FilterPosts from "./filter";
import { Pagination } from "@/components/ui/pagination";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Posts | UKM PENRISTEK UT",
  description: "Browse all posts from UKM PENRISTEK UT",
  openGraph: {
    title: "Posts | UKM PENRISTEK UT",
    description: "Browse all posts from UKM PENRISTEK UT",
    url: "https://ukmpenristekut.site/posts",
    siteName: "UKM PENRISTEK UT",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Posts | UKM PENRISTEK UT",
    description: "Browse all posts from UKM PENRISTEK UT",
  },
  alternates: {
    canonical: "https://ukmpenristekut.com/posts",
  },
};

// Use static value for revalidation
export const revalidate = 7200; // 5 minutes

// Loading component
function PostsLoading() {
  return (
    <Section>
      <Container>
        <div className="space-y-8 animate-pulse">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-48 bg-muted rounded" />
                <div className="h-6 w-3/4 bg-muted rounded" />
                <div className="h-4 w-1/2 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

async function PostsContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  try {
    // Safely extract search parameters
    const author = searchParams.author;
    const tag = searchParams.tag;
    const category = searchParams.category;
    const pageParam = searchParams.page;

    // Fetch data with static revalidation time
    const [postsData, authorsData, tagsData, categoriesData] = await Promise.all([
      getClient().query({
        query: GET_ALL_POSTS,
        variables: {
          first: 100,
          after: null,
          authorName: author || null,
        },
        context: {
          fetchOptions: {
            next: { revalidate: 300 }
          }
        }
      }),
      getClient().query({ 
        query: GET_ALL_AUTHORS,
        context: {
          fetchOptions: {
            next: { revalidate: 3600 }
          }
        }
      }),
      getClient().query({ 
        query: GET_ALL_TAGS,
        context: {
          fetchOptions: {
            next: { revalidate: 3600 }
          }
        }
      }),
      getClient().query({ 
        query: GET_ALL_CATEGORIES,
        context: {
          fetchOptions: {
            next: { revalidate: 3600 }
          }
        }
      })
    ]);

    const posts = postsData.data.posts.nodes;
    const authors = authorsData.data.users.nodes;
    const tags = tagsData.data.tags.nodes;
    const categories = categoriesData.data.categories.nodes;

    const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
    const postsPerPage = 9;
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const paginatedPosts = posts.slice(
      (currentPage - 1) * postsPerPage,
      currentPage * postsPerPage,
    );

    let filteredPosts = paginatedPosts;
    if (author) {
      filteredPosts = filteredPosts.filter(post => post.author?.node?.slug === author);
    }
    if (tag) {
      filteredPosts = filteredPosts.filter(post => 
        post.tags?.nodes?.some(t => t.slug === tag)
      );
    }
    if (category) {
      filteredPosts = filteredPosts.filter(post => 
        post.categories?.nodes?.some(c => c.slug === category)
      );
    }

    return (
      <Section>
        <Container>
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">Posts</h1>
              <FilterPosts
                authors={authors}
                tags={tags}
                categories={categories}
                selectedAuthor={author}
                selectedTag={tag}
                selectedCategory={category}
              />
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-xl text-muted-foreground">
                  No posts found.
                </p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  baseUrl="/posts"
                  searchParams={searchParams}
                />
              </div>
            )}
          </div>
        </Container>
      </Section>
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return (
      <Section>
        <Container>
          <div className="text-center py-10">
            <p className="text-xl text-red-500">
              Error loading posts. Please try again later.
            </p>
          </div>
        </Container>
      </Section>
    );
  }
}

// Main component with suspense
export default function PostsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <Suspense fallback={<PostsLoading />}>
      <PostsContent searchParams={searchParams} />
    </Suspense>
  );
}