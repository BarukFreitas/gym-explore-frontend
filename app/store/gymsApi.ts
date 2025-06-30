import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
}

export interface ReviewCreatePayload {
    gymId: number;
    userId: number;
    comment: string;
    rating: number;
}

export type GymCreatePayload = Omit<Gym, 'id'>;

export type GymUpdatePayload = {
    id: number;
    body: GymCreatePayload;
};

export const gymsApi = createApi({
    reducerPath: "gymsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/",
    }),
    tagTypes: ["Gym", "Review"],
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
            invalidatesTags: (result, error, { gymId }) => [{ type: 'Review', id: gymId }],
        }),

        updateGym: builder.mutation<Gym, GymUpdatePayload>({
            query: ({ id, body }) => ({
                url: `gyms/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Gym', id: 'LIST' }, { type: 'Gym', id }],
        }),

        // MUTATION PARA EXCLUIR UMA ACADEMIA
        deleteGym: builder.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `gyms/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (result, error, id) => [{ type: 'Gym', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetAllGymsQuery,
    useGetReviewsByGymIdQuery,
    useAddGymMutation,
    useAddReviewMutation,
    useUpdateGymMutation,
    useDeleteGymMutation
} = gymsApi;