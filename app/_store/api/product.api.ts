import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (payload) => ({
        url: "/product/create",
        method: "POST",
        body: payload,
      }),
    }),
    productList: builder.query({
      query: (params) => ({
        url: "/product/list",
        params: params,
        method: "GET",
      }),
    }),
    productShow: builder.query({
      query: (id) => `/product/show/${id}`,
    }),
    productUpdate: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/product/update/${id}`,
        body: payload,
        method: "PUT",
      }),
    }),
    productDelete: builder.mutation({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateProductMutation, useProductListQuery } = productApi;
