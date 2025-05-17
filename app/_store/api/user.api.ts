import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userList: builder.query({
      query: (params) => ({
        url: "/user/list",
        method: "GET",
        params,
      }),
      providesTags: ["user"],
    }),
  }),
});

export const { useUserListQuery } = userApi;
