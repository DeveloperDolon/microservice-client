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
  }),
});

export const { useShowOrderQuery } = orderApi;
