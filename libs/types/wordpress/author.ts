export interface Author {
    id: string;
    name: string;
    description: string;
    slug: string;
    avatar: {
      url: string;
    };
  }

  export interface AuthorWithPosts extends Author {
    posts: {
      nodes: Post[];
    };
  }