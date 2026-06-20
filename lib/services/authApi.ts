import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
    prepareHeaders: (headers) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    calculatePrice: builder.query({
      query: ({ users, promoCode }: { users: number; promoCode?: string }) => ({
        url: '/auth/calculate-price',
        method: 'GET',
        params: {
          users,
          ...(promoCode ? { promo: promoCode } : {}),
        },
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    register: builder.mutation({
      query: (payload) => ({
        url: '/auth/register',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    verifyPayment: builder.mutation({
      query: (payload) => ({
        url: '/payment/verify',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    sendOtp: builder.mutation({
      query: (payload: { email: string }) => ({
        url: '/auth/send-otp',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    verifyOtp: builder.mutation({
      query: (payload: { email: string; otp: string }) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
  }),
});

export const {
  useCalculatePriceQuery,
  useRegisterMutation,
  useVerifyPaymentMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} = authApi;
