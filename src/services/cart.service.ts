import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import baseUrl from "@Configs/url";
export const cartApi = createApi({
  reducerPath: "cart",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getCart: build.query({
      query: (userId) => `public/cart/getCart/${userId}`,
    }),
    addCart: build.mutation({
      query: (body) => {
        return {
          url: "public/cart/addItem",
          method: "POST",
          body,
        };
      },
    }),
    updateCart: build.mutation({
      query: (body) => {
        return {
          url: "public/cart/updateItem",
          method: "POST",
          body,
        };
      },
    }),
    removeCart: build.mutation({
      query: (body) => {
        return {
          url: "public/cart/removeItem",
          method: "DELETE",
          body,
        };
      },
    }),
    removeAllCart: build.mutation({
      query: (body) => {
        return {
          url: "public/cart/removeAll/"+body,
          method: "DELETE",
          body,
        };
      },
    }),
    checkout: build.mutation({
      query: (body) => {
        return {
          url: "public/order/payCart",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useAddCartMutation,
  useGetCartQuery,
  useRemoveAllCartMutation,
  useRemoveCartMutation,
  useUpdateCartMutation,
  useCheckoutMutation,
  useLazyGetCartQuery

} = cartApi;
