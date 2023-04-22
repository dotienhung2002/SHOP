import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import baseUrl from "@Configs/url";
import { createAction } from "@reduxjs/toolkit";
import { withPayloadType } from "@Redux/storeConfig/store";

export const menuApi = createApi({
  reducerPath: "menu",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getBrands: build.query({
      query: () => "public/menu/get-brands",
    }),
    getClassifys: build.query({
      query: () => "public/menu/get-classify-products",
    }),
    getMadeIn: build.query({
      query: () => "public/menu/get-madeIns",
    }),
  }),
});

// }
const initialState = {
  amount: 0,
};

export const addressApi = createApi({
  reducerPath: "address",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://online-gateway.ghn.vn/shiip/public-api/master-data/",
  }),

  endpoints: (build) => ({
    getProvinces: build.query({
      query: () => ({
        url: "province",
        headers: {
          token: "531c855f-15f2-11ed-8636-7617f3863de9",
        },
      }),
    }),

    getDistricts: build.mutation({
      query: (province_id) => ({
        url: "district",
        headers: {
          token: "531c855f-15f2-11ed-8636-7617f3863de9",
        },
        method:"POST",
        body: {
          province_id,
        },
      }),
    }),
    getWards: build.mutation({
      query: (district_id) => ({
        url: "ward",
        headers: {
          token: "531c855f-15f2-11ed-8636-7617f3863de9",
        },
        body: {
          district_id,
        },
        method:"POST",

      }),
    }),
  }),
});
export const { 
  useGetBrandsQuery, useGetClassifysQuery, useGetMadeInQuery } =
  menuApi;

export const {
  useGetDistrictsMutation,
  useGetProvincesQuery,
  useGetWardsMutation,
  usePrefetch,
} = addressApi;
