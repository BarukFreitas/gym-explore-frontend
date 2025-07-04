import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface Gym {
    id: number;
    name: string;
    address: string;
    phone: string;
    imageUrl: string;
}

export interface Review {
    id: number;
    comment: string;
    rating: number;
    creationDate: string;
    gymId: number;
    userName:string;
    pointsAwarded: boolean;
}

export interface ReviewCreatePayload {
    gymId: number;
    userId: number;
    comment: string;
    rating: number;
}

export interface ContactPayload {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface StoreItem {
    id: number;
    name: string;
    description: string;
    pointsCost: number;
}

export interface StoreItemCreatePayload {
    name: string;
    description: string;
    pointsCost: number;
}

export interface PurchasePayload {
    userId: number;
    itemId: number;
}

export type GymCreatePayload = Omit<Gym, 'id'>;

export type GymUpdatePayload = {
    id: number;
    body: GymCreatePayload;
};

export const gymsApi = createApi({
    reducerPath: "gymsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token; 
            console.log("DEBUG - Token no gymsApi.ts prepareHeaders:", token); 
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            } else {
                console.warn("AVISO: Token JWT não encontrado no estado Redux para gymsApi. Requisição pode falhar por autenticação.");
            }
            return headers;
        },
    }),
    tagTypes: ["Gym", "Review", "User", "StoreItem"],
    endpoints: (builder) => ({
        getAllGyms: builder.query<Gym[], void>({
            query: () => "gyms",
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: "Gym" as const, id })),
                        { type: "Gym", id: "LIST" },
                    ]
                    : [{ type: "Gym", id: "LIST" }],
        }),

        getReviewsByGymId: builder.query<Review[], number>({
            query: (gymId) => `reviews/gym/${gymId}`,
            providesTags: (result, error, gymId) => [{ type: 'Review', id: gymId }],
        }),

        addGym: builder.mutation<Gym, GymCreatePayload>({
            query: (newGym) => ({
                url: 'gyms',
                method: 'POST',
                body: newGym,
            }),
            invalidatesTags: [{ type: 'Gym', id: 'LIST' }],
        }),

        addReview: builder.mutation<Review, ReviewCreatePayload>({
            query: ({ gymId, userId, ...body }) => ({
                url: `reviews/gym/${gymId}/user/${userId}`,
                method: 'POST',
                body: { comment: body.comment, rating: body.rating },
            }),
            invalidatesTags: (result, error, { gymId, userId }) => [
                { type: 'Review', id: gymId },
                { type: 'User', id: userId }
            ],
        }),

        updateGym: builder.mutation<Gym, GymUpdatePayload>({
            query: ({ id, body }) => ({
                url: `gyms/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Gym', id: 'LIST' }, { type: 'Gym', id }],
        }),

        deleteGym: builder.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `gyms/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (result, error, id) => [{ type: 'Gym', id: 'LIST' }],
        }),

        sendContactForm: builder.mutation<void, ContactPayload>({
            query: (contactData) => ({
                url: 'contact',
                method: 'POST',
                body: contactData,
            }),
        }),

        getStoreItems: builder.query<StoreItem[], void>({
            query: () => 'store/items',
            providesTags: ['StoreItem']
        }),

        addStoreItem: builder.mutation<StoreItem, StoreItemCreatePayload>({
            query: (newItem) => ({
                url: 'store/admin/items',
                method: 'POST',
                body: newItem,
            }),
            invalidatesTags: ['StoreItem'],
        }),

        purchaseStoreItem: builder.mutation<void, PurchasePayload>({
            query: ({ userId, itemId }) => ({
                url: `store/purchase/user/${userId}/item/${itemId}`,
                method: 'POST',
                body: {}
            }),
            invalidatesTags: (result, error, { userId }) => [{ type: 'User', id: userId }],
        })
    }),
});

export const {
    useGetAllGymsQuery,
    useGetReviewsByGymIdQuery,
    useAddGymMutation,
    useAddReviewMutation,
    useUpdateGymMutation,
    useDeleteGymMutation,
    useSendContactFormMutation,
    useGetStoreItemsQuery,
    useAddStoreItemMutation,
    usePurchaseStoreItemMutation
} = gymsApi;