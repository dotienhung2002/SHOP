import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import baseUrl from "@Configs/url";
export const orderApi = createApi({
  reducerPath: "order",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getMyOrder: build.query({
      query: (email) => `public/account/get-orders?email=${email}`,
    }),
    getOrderDetail: build.query({
      query: (id) => `public/account/get-order-detail?id=${id}`,
    }),

    getShipService: build.mutation({
      query: (body) => {
        return {
          url: "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services",
          method: "POST",
          body,
          headers: {
            token: "531c855f-15f2-11ed-8636-7617f3863de9",
          },
        };
      },
    }),
    getShipFee: build.mutation({
      query: (body) => {
        return {
          url: "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
          method: "POST",
          body,
          headers: {
            token: "531c855f-15f2-11ed-8636-7617f3863de9",
          },
        };
      },
    }),
    cancelOrder: build.mutation({
      query: (id) => {
        return {
          url: "public/order/cancel-order?id=" + id,
          method: "PUT",
        };
      },
    }),
    paymentVnpay: build.mutation({
      query: (body) => {
        return {
          url: "public/payment/vnpay",
          method: "POST",
          body,
        };
      },
    }),
    vnpayIpn: build.query({
      query: (query) => `public/payment/vnpay_ipn`+query,
    }),
    voucher: build.query({
      query: (query) => `public/voucher/get-usable-for-anonymous`,
    }),
  }),
});
export const {
  useLazyGetMyOrderQuery,
  useLazyGetOrderDetailQuery,
  useCancelOrderMutation,
  useGetShipFeeMutation,
  useGetShipServiceMutation,
  usePaymentVnpayMutation,
  useLazyVnpayIpnQuery
  ,
  useVnpayIpnQuery
  ,
  useVoucherQuery
} = orderApi;
