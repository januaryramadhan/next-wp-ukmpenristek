export interface PageInfo {
    hasNextPage: boolean;
    endCursor: string;
  }
  
  export interface QueryResponse<T> {
    nodes: T[];
    pageInfo?: PageInfo;
  }