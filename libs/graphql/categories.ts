import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories(first: 100) {
      nodes {
        id
        name
        slug
        description
        count
      }
    }
  }
`;

export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoryBySlug($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      id
      name
      slug
      description
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
          author {
            node {
              name
              slug
              avatar {
                url
              }
            }
          }
        }
      }
    }
  }
`;
