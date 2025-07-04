import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Product {
    id: number;
    title: string;
    price: number;
    images: string[];
    reviews: {
        rating: number;
        comment: string;
        reviewerName: string;
    }[];
}

interface ProductsQueryParams {
    limit?: number;
    skip?: number;
}

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://dummyjson.com/",
    }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        getAllProducts: builder.query<Product[], ProductsQueryParams | void>({
            query: ({ limit = 10, skip = 0 } = {}) => ({
                url: "products",
                params: { limit, skip },
            }),
            transformResponse: (response: { products: Product[] }) => response.products,
            keepUnusedDataFor: 30,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: "Product" as const, id })),
                        { type: "Product", id: "LIST" },
                    ]
                    : [{ type: "Product", id: "LIST" }],
        }),
    }),
});

export const { useGetAllProductsQuery } = productsApi;