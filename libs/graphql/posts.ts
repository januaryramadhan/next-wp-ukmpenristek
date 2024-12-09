import { gql } from "@apollo/client";



export const GET_ALL_POSTS = gql`
  query GetAllPosts($first: Int, $after: String, $authorName: String) {
    posts(
      first: $first, 
      after: $after,
      where: { authorName: $authorName }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        author {
          node {
            name
            slug
            avatar {
              url
            }
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      date
      slug
      excerpt
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          name
          slug
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          id
          name
          slug
        }
      }
      tags {
        nodes {
          id
          name
          slug
        }
      }
    }
  }
`;

export const GET_RELATED_POSTS = gql`
  query GetRelatedPosts($categoryIn: [ID], $notIn: [ID], $first: Int = 3) {
    posts(first: $first, where: { categoryIn: $categoryIn, notIn: $notIn }) {
      nodes {
        id
        title
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;