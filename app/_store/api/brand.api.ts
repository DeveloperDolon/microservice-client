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
    brandUpdate: builder.mutation({
      query: ({id, payload}) => ({
        url: `/brand/update/${id}`,
        body: payload,
        method: "PUT"
      }),
      invalidatesTags: ["brand"]
    })
  }),
});

export const { useBrandCreateMutation, useBrandListQuery, useBrandUpdateMutation } = brandApi;
