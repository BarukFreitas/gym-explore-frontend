import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserRegisterRequest, UserLoginRequest, UserAuthResponse, ErrorResponse } from "@/app/types/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/users",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
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
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;