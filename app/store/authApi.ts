import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserRegisterRequest, UserLoginRequest, UserAuthResponse, ErrorResponse } from "@/app/types/auth";

export interface PointsResponse {
  points: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<UserAuthResponse, UserRegisterRequest>({
      query: (userData) => ({
        url: "/api/users/register",
        method: "POST",
        body: userData,
      }),
      transformErrorResponse: (response: { status: number; data: ErrorResponse }) => response.data,
    }),
    loginUser: builder.mutation<UserAuthResponse, UserLoginRequest>({
      query: (credentials) => ({
        url: "/api/users/login",
        method: "POST",
        body: credentials,
      }),
      transformErrorResponse: (response: { status: number; data: ErrorResponse }) => response.data,
    }),

    getUserPoints: builder.query<PointsResponse, number>({
      query: (userId) => `/api/users/${userId}/points`,
      providesTags: (result, error, userId) => [{ type: 'User', id: userId }],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserPointsQuery
} = authApi;