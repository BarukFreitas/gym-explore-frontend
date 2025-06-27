import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PostCreateRequest, PostResponse } from "@/app/types/post";
import { ErrorResponse } from "@/app/types/auth";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/posts",
    prepareHeaders: (headers) => {
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
      invalidatesTags: [{ type: "Post", id: "LIST" }],
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

    getPostsByUserId: builder.query<PostResponse[], number>({
        query: (userId) => `/user/${userId}`,
        providesTags: (result, error, userId) => [{ type: 'Post', id: userId }],
        transformErrorResponse: (response: { status: number; data: ErrorResponse }) => response.data,
    }),
  }),
});

export const { useCreatePostMutation, useGetAllPostsQuery, useGetPostsByUserIdQuery } = postApi;