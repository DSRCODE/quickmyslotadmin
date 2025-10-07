import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bidApi = createApi({
  reducerPath: "bidApi",
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
  tagTypes: ["bidApi"],
  endpoints: (builder) => ({
    // Get All bid
    getbid: builder.query({
      query: () => `admin/bids`,
      providesTags: ["bidApi"],
    }),

    // Add (POST) bid
    addBid: builder.mutation({
      query: (formData) => ({
        url: `admin/bids`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["bidApi"],
    }),
    // Add (POST) bid
    updateBid: builder.mutation({
      query: ({ formData, id }) => ({
        url: `admin/bids/update/${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["bidApi"],
    }),

    deleteBid: builder.mutation({
      query: (id) => ({
        url: `admin/bids/delete/${id}`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["bidApi"],
    }),
    BidApproved: builder.mutation({
      query: (id) => ({
        url: `bid-entri-aaproved/${id}`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["bidApi"],
    }),
    BidReject: builder.mutation({
      query: (id) => ({
        url: `bid-entri-reject/${id}`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["bidApi"],
    }),
  }),
});

export const {
  useGetbidQuery,
  useAddBidMutation,
  useBidApprovedMutation,
  useBidRejectMutation,
  useDeleteBidMutation,
  useUpdateBidMutation,
} = bidApi;
