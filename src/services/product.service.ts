import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import baseUrl from "@Configs/url";
export const productApi = createApi({
  reducerPath: "product",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getProductBrands: build.query({
      query: (id) => "public/product/brand/get-all-ready/" + id,
    }),
    getProductCategories: build.query({
      query: (id) => "public/product/category/get-all-ready/" + id,
    }),
    getMadeIn: build.query({
      query: (id) => "public/product/madeIn/get-all-ready/" + id,
    }),
    getProducts: build.mutation({
      query: (body) => {
        return {
          url: "product/get-list",
          method: "POST",
          body,
        };
      },
    }),
    getDetailProduct: build.query({
      query: (id) => `public/product/get-detail/${id}`,
    }),
    getAllProduct: build.query({
      query: () => `public/product/get-all-ready`,
    }),
    getAllByKey: build.query({
      query: (key) => `public/product/find?keyword=`+key,
    }),
  }),
});
export const {
  useGetProductsMutation,
  useGetDetailProductQuery,
  useGetAllProductQuery,
  useLazyGetMadeInQuery,
  useLazyGetProductCategoriesQuery,
  useLazyGetProductBrandsQuery,
  useLazyGetAllByKeyQuery
} = productApi;
