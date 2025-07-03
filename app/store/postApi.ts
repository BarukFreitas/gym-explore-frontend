import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PostCreateRequest, PostResponse } from "@/app/types/post";
import { ErrorResponse } from "@/app/types/auth";
import { RootState } from "@/app/store/store";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/posts",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // 1. ADICIONE A TAG 'User' AQUI
  tagTypes: ["Post", "User"],
  endpoints: (builder) => ({
    createPost: builder.mutation<PostResponse, { userId: number; data: PostCreateRequest }>({
      query: ({ userId, data }) => ({
        url: `/${userId}`,
        method: "POST",
        body: data,
      }),

      invalidatesTags: (result, error, { userId }) => [
        { type: 'Post', id: 'LIST' },
        { type: 'User', id: userId }
      ],
      transformErrorResponse: (response: { status: number; data: ErrorResponse }) => response.data,
    }),
    getAllPosts: builder.query<PostResponse[], void>({
      query: () => "/",
      providesTags: (result) =>
          result
              ? [
                ...result.map(({ id }) => ({ type: "Post" as const, id })),
                { type: "Post", id: "LIST" },
              ]
              : [{ type: "Post", id: "LIST" }],
      transformErrorResponse: (response: { status: number; data: ErrorResponse }) => response.data,
    }),
    deletePost: builder.mutation<void, number>({
      query: (postId) => ({
        url: `/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }], // Invalida a lista de posts
      transformErrorResponse: (response: { status: number; data: ErrorResponse }) => response.data,
    }),
  }),
});

export const { useCreatePostMutation, useGetAllPostsQuery, useDeletePostMutation } = postApi;