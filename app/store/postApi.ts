import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PostCreateRequest, PostResponse } from "@/app/types/post";
import { ErrorResponse } from "@/app/types/auth";
// REMOVA a linha abaixo que importa RootState de "./store"
// import { RootState } from "./store";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/posts",
    prepareHeaders: (headers, { getState }) => {
      // Adicionar token de autenticação se disponível
      // Altere 'as RootState' para 'as any' ou defina um tipo mais específico para o slice de autenticação
      const token = (getState() as any).auth.token; // Alterado aqui
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    createPost: builder.mutation<PostResponse, { userId: number; data: PostCreateRequest }>({
      query: ({ userId, data }) => ({
        url: `/${userId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
      transformErrorResponse: (response: { status: number; data: ErrorResponse }) => response.data,
    }),
    getAllPosts: builder.query<PostResponse[], void>({
      query: () => "/",
      providesTags: ["Post"],
      transformErrorResponse: (response: { status: number; data: ErrorResponse }) => response.data,
    }),
    deletePost: builder.mutation<void, number>({
      query: (postId) => ({
        url: `/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
      transformErrorResponse: (response: { status: number; data: ErrorResponse }) => response.data,
    }),
  }),
});

export const { useCreatePostMutation, useGetAllPostsQuery, useDeletePostMutation } = postApi;