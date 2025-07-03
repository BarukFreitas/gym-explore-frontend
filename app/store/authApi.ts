import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserRegisterRequest, UserLoginRequest, UserAuthResponse, ErrorResponse } from "@/app/types/auth";

// 1. CRIE UMA NOVA INTERFACE PARA A RESPOSTA DOS PONTOS
export interface PointsResponse {
  points: number;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    // A baseUrl aponta para /api/users, que é perfeito para o nosso novo endpoint
    baseUrl: "http://localhost:8080/api/users",
    prepareHeaders: (headers) => {
      // Se você usar autenticação por token, adicione a lógica para o cabeçalho aqui
      return headers;
    },
  }),
  // Adicione uma tag 'User' para poder invalidar o cache no futuro, se necessário
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<UserAuthResponse, UserRegisterRequest>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
      transformErrorResponse: (response: { status: number; data: ErrorResponse }) => response.data,
    }),
    loginUser: builder.mutation<UserAuthResponse, UserLoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      transformErrorResponse: (response: { status: number; data: ErrorResponse }) => response.data,
    }),

    // 2. ADICIONE O NOVO ENDPOINT DE QUERY AQUI
    getUserPoints: builder.query<PointsResponse, number>({
      // Ele espera receber uma resposta do tipo PointsResponse e aceita um 'number' (o ID do utilizador) como argumento
      query: (userId) => `/${userId}/points`, // Constrói a URL: /api/users/{userId}/points
      providesTags: (result, error, userId) => [{ type: 'User', id: userId }],
    }),
  }),
});

// 3. EXPORTE O NOVO HOOK GERADO
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserPointsQuery // <<< NOVO HOOK
} = authApi;