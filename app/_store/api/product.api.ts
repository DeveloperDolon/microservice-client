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
  }),
});

export const { useCreateProductMutation } = productApi;
