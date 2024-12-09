export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    count?: number;
  }
  
  export interface CategoryWithPosts extends Category {
    posts: {
      nodes: Post[];
    };
  }
  