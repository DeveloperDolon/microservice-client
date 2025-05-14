import { FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { BaseQueryApi } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  prepareHeaders: (headers, { getState, extra, endpoint, type, forced, arg }) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    const body = typeof arg === "object" && "body" in arg ? arg.body : null;
    if (!(body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }
    return headers;
  },
  fetchFn: async (input, init) => {
    const response = await fetch(input, init);
    return response;
  },
});

export const baseQueryWithAuth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (
    (result?.error?.data as { message?: string })?.message ===
    "Unauthenticated."
  ) {
    console.log("Access token expired or invalid. Logging out...");

    localStorage.removeItem("authToken");

    window.location.href = "/dashboard_login";
  }

  return result;
};
