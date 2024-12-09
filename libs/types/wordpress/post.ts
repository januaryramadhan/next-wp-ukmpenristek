export interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content?: string;
    date: string;
    featuredImage: {
      node: {
        sourceUrl: string;
      };
    };
    author: {
      node: {
        name: string;
        slug: string;
        avatar: {
          url: string;
        };
      };
    };
    categories: {
      nodes: Category[];
    };
    tags?: {
      nodes: Tag[];
    };
  }
  