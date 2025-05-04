import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (payload) => ({
        url: "/product/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["product"],
    }),
    productList: builder.query({
      query: (params) => ({
        url: "/product/list",
        params: params,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    productShow: builder.query({
      query: (id) => `/product/show/${id}`,
      providesTags: ["product"],
    }),
    productUpdate: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/product/update/${id}`,
        body: payload,
        method: "PUT",
      }),
      invalidatesTags: ["product"],
    }),
    productDelete: builder.mutation({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useProductListQuery,
  useProductShowQuery,
  useProductUpdateMutation,
  useProductDeleteMutation,
} = productApi;
