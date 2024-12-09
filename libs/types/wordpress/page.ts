export interface Page {
    id: string;
    title: string;
    slug: string;
    content: string;
    date: string;
    featuredImage?: {
      node: {
        sourceUrl: string;
      };
    };
  }
  