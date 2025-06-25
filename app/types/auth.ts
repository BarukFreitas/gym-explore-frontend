
export interface UserRegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface UserAuthResponse {
  id: number;
  username: string;
  email: string;
  message: string;
}

export interface ErrorResponse {
  error: string;
}