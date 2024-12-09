import { gql } from "@apollo/client";

export const GET_ALL_TAGS = gql`
  query GetAllTags {
    tags(first: 100) {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;

export const GET_TAG_BY_SLUG = gql`
  query GetTagBySlug($slug: ID!) {
    tag(id: $slug, idType: SLUG) {
      id
      name
      slug
      count
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
