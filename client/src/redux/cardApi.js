import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const cardApi = createApi({
  reducerPath: "cardApi",
  tagTypes: ["Orders"],
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getCardProducts: builder.query({
      query: () => `orders`,
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: "Orders", id })), "Orders"]
          : ["Orders"],
    }),
    addToCard: builder.mutation({
      query: (body) => ({
        url: "orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),
    decrementFromCard: builder.mutation({
      query: (id) => ({
        url: `orders/dec/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Orders"],
    }),

    incrementFromCard: builder.mutation({
      query: (id) => ({
        url: `orders/inc/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteFromCard: builder.mutation({
      query: (id) => ({
        url: `orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});
export const {
  useGetCardProductsQuery,
  useAddToCardMutation,
  useDecrementFromCardMutation,
  useDeleteFromCardMutation,
  useIncrementFromCardMutation,
} = cardApi;
