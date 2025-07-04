// O que o formulário de registo envia
export interface UserRegisterRequest {
  username: string;
  email: string;
  password: string;
  role: string;
}

// O que o formulário de login envia
export interface UserLoginRequest {
  username: string;
  password: string;
}

// Como a resposta da sua API de login deve ser
export interface UserAuthResponse {
  id: number;
  username: string;
  email: string;
  roles: string[];
  token: string;
  points: number;
}

// Interface para o tratamento de erros
export interface ErrorResponse {
  error: string;
  message?: string; // Opcional
  path?: string;    // Opcional
  status?: number;  // Opcional
  timestamp?: string; // Opcional
}