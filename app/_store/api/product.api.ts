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
            method: "GET"
        })
    }),
    productShow: builder.query({
        query: (id) => (`/product/show/${id}`)
    }),
  }),
});

export const { useCreateProductMutation, useProductListQuery } = productApi;
