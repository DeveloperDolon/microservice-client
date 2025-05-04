import { baseApi } from "./baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    brandCreate: builder.mutation({
      query: (payload) => ({
        url: "/brand/create",
        body: payload,
        method: "POST",
      }),
      invalidatesTags: ["brand"],
    }),
    brandList: builder.query({
      query: (params) => ({
        url: "/brand/list",
        params: params,
        method: "GET",
      }),
      providesTags: ["brand"]
    }),
  }),
});

export const { useBrandCreateMutation, useBrandListQuery } = brandApi;
