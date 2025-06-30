import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// 1. Defina uma interface que corresponda à sua entidade Gym do backend
interface Gym {
    id: number;
    name: string;
    address: string;
    phone: string;
    imageUrl: string; // Corresponde ao campo no seu DTO e Entidade
}

// 2. Renomeie a API para algo mais descritivo, como "gymsApi"
export const gymsApi = createApi({
    reducerPath: "gymsApi", // Nome único para o reducer

    // 3. Altere a baseUrl para a URL do seu backend
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/",
    }),

    // 4. Defina o tipo de "tag" para o caching. Usaremos 'Gym'
    tagTypes: ["Gym"],

    endpoints: (builder) => ({
        // 5. Renomeie o endpoint para refletir o que ele busca
        getAllGyms: builder.query<Gym[], void>({ // Recebe um array de Gym e não precisa de argumentos (void)

            // 6. Aponte a URL para o seu endpoint de academias
            query: () => "gyms",

            // 7. A função 'transformResponse' não é mais necessária,
            // pois sua API já retorna o array de academias diretamente.

            // 8. Configure as tags para o cache automático.
            // Isso ajuda a recarregar a lista quando você adiciona, edita ou exclui uma academia.
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: "Gym" as const, id })),
                        { type: "Gym", id: "LIST" },
                    ]
                    : [{ type: "Gym", id: "LIST" }],
        }),

        // Você pode adicionar os outros endpoints (create, update, delete) aqui no futuro
        // Ex:
        // createGym: builder.mutation<Gym, Partial<Gym>>({ ... }),
        // updateGym: builder.mutation<Gym, { id: number; body: Partial<Gym> }>({ ... }),
        // deleteGym: builder.mutation<{ success: boolean; id: number }, number>({ ... }),
    }),
});

// 9. Exporte o novo hook com o nome correto
export const { useGetAllGymsQuery } = gymsApi;