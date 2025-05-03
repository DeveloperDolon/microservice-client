import { baseApi } from "./baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    brandCreate: builder.mutation({
      query: (payload) => ({
        url: "/brand/create",
        body: payload,
        method: "POST",
      }),
    }),
  }),
});

export const { useBrandCreateMutation } = brandApi;
