export interface Tag {
    id: string;
    name: string;
    slug: string;
    count: number;
  }
  
  export interface TagWithPosts extends Tag {
    posts: {
      nodes: Post[];
    };
  }
  