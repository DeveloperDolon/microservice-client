import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    showOrder: builder.query({
      query: (id) => ({
        url: `/order/show/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    orderList: builder.query({
      query: (params) => ({
        url: "/order/list",
        method: "GET",
        params,
      }),
      providesTags: ["order"],
    }),
  }),
});

export const { useShowOrderQuery, useOrderListQuery } = orderApi;
