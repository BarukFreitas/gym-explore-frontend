export interface UserRegisterRequest {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface UserLoginRequest {
  username: string;
  password: string;
}


export interface UserAuthResponse {
  id: number;
  username: string;
  email: string;
  roles: string[];
  token: string;
  points: number;
}


export interface ErrorResponse {
  error: string;
  message?: string; // Opcional
  path?: string;    // Opcional
  status?: number;  // Opcional
  timestamp?: string; // Opcional
}