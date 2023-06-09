// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse, GetProductsResponse, GetTransactionsResponse } from "./type";

// Define a service using a base URL and expected endpoints

export const api = createApi({
  reducerPath: "main",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Kpis", "Products", "Transactions"],
  endpoints: (build) => ({
    getKpis: build.query<GetKpisResponse, void>({
      query: () => `kpi/kpis`,
      providesTags: ["Kpis"],
    }),
    getProducts: build.query<GetProductsResponse[], void>({
      query: () => `product/products`,
      providesTags: ["Products"],
    }),
    getTransactions: build.query<GetTransactionsResponse[], void>({
      query: () => `transaction/transactions`,
      providesTags: ["Transactions"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } = api;
