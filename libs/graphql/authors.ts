import { gql } from "@apollo/client";

export const GET_ALL_AUTHORS = gql`
  query GetAllAuthors {
    users(first: 100) {
      nodes {
        id
        name
        description
        slug
        avatar {
          url
        }
      }
    }
  }
`;

export const GET_AUTHOR_BY_SLUG = gql`
  query GetAuthorBySlug($slug: String!) {
    user(id: $slug, idType: SLUG) {
      id
      name
      description
      slug
      avatar {
        url
      }
      posts {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
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
  }
`;

// Jika diperlukan tambahan query related authors
export const GET_RELATED_AUTHORS = gql`
  query GetRelatedAuthors($notIn: [ID!]) {
    users(first: 3, where: { notIn: $notIn }) {
      nodes {
        id
        name
        description
        slug
        avatar {
          url
        }
      }
    }
  }
`;
