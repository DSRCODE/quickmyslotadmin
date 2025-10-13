import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["ordersApi"],
  endpoints: (builder) => ({
    // Get All orders
    getorders: builder.query({
      query: ({ role }) => `admin/all-bookings?role=${role}`,
      providesTags: ["ordersApi"],
    }),
  }),
});

export const { useGetordersQuery } = ordersApi;
