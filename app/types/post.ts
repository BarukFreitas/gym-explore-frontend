export interface PostCreateRequest {
  content: string;
}

export interface PostResponse {
  id: number;
  content: string;
  timestamp: string;
  userId: number;
  username: string;
}