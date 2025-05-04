import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    showReview: builder.query({
      query: (id) => `/review/show/${id}`,
      providesTags: ["review"],
    }),
    reviewList: builder.query({
      query: (params) => ({
        url: "/review/list",
        params,
        method: "GET",
      }),
      providesTags: ["review"],
    }),
  }),
});

export const { useShowReviewQuery, useReviewListQuery } = reviewApi;
