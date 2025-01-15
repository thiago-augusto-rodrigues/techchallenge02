export interface Post {
    _id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface PostFormData {
    title: string;
    content: string;
    author: string;
  }
  
  export interface ApiResponse<T> {
  data: {
    posts: T;
    currentPage: number;
    totalPages: number;
    totalPosts: number;
  };
  error?: string;
}
  
  export interface PostsResponse {
    posts: Post[];
    currentPage: number;
    totalPages: number;
    totalPosts: number;
  }
  