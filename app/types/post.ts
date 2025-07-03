export interface PostCreateRequest {
  content: string;
  imageUrl?: string;
}

export interface PostResponse {
  id: number;
  content: string;
  timestamp: string;
  userId: number;
  username: string;
  imageUrl?: string;
  pointsAwarded: boolean;
}