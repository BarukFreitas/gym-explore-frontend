import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PostCreateRequest, PostResponse } from "@/app/types/post";
import { ErrorResponse } from "@/app/types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
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