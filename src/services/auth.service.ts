import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import baseUrl from "@Configs/url";
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => {
        return {
          url: "public/customer/login",
          method: "POST",
          body,
        };
      },
    }),
    register: build.mutation({
      query: (body) => {
        return {
          url: "public/customer/register",
          method: "POST",
          body,
        };
      },
    }),
    loginGoogle: build.mutation({
      query: (body) => {
        return {
          url: "public/customer/login-google",
          method: "POST",
          body,
        };
      },
    }),
    updateProfile: build.mutation({
      query: (body) => {
        return {
          url: "public/account/update-profile?userId="+body?.id,
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const { useLoginGoogleMutation, useLoginMutation, useRegisterMutation ,useUpdateProfileMutation} =
  authApi;
