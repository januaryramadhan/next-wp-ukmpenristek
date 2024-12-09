import { gql } from "@apollo/client";

export const GET_ALL_PAGES = gql`
  query GetAllPages {
    pages(first: 100) {
      nodes {
        id
        title
        slug
        date
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: SLUG) {
      id
      title
      content
      date
      slug
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;
