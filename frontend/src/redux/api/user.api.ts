import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTH } from './constants/api';
import { AuthResponse } from '@/models/AuthResponse.interface';
import { LoginRequest } from '@/models/LoginRequest.interface';
import { RegisterRequest } from '@/models/RegisterRequest.interface';

export const userApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: AUTH }),
  endpoints: (builder) => ({
    userRegister: builder.mutation<AuthResponse, RegisterRequest>({
      query: (newTechnology) => ({
        url: '/auth/signup',
        method: 'POST',
        body: newTechnology,
      }),
    }),
    userLogin: builder.mutation<AuthResponse, LoginRequest>({
      query: (newTechnology) => ({
        url: '/auth/signin',
        method: 'POST',
        body: newTechnology,
      }),
    }),
  }),
});

export const { useUserRegisterMutation, useUserLoginMutation } = userApi;
