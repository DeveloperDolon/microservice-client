import { LoginValidationType } from "@/app/_validations/auth_validation";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload: LoginValidationType) => ({
        url: "/user/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["auth"],
    }),
    me: builder.query({
      query: () => ({ url: "/user/profile" }),
      providesTags: ["auth"],
    }),
  }),
});

export const { useLoginMutation, useMeQuery } = authApi;
