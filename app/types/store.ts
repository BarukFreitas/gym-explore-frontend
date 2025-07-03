// Esta interface define a estrutura de um item da loja, como vem da sua API.
export interface StoreItem {
    id: number;
    name: string;
    description: string;
    pointsCost: number;
}

// Esta interface define o que é necessário para o admin criar um item.
export interface StoreItemCreatePayload {
    name: string;
    description: string;
    pointsCost: number;
}

// Esta interface define o que é necessário para um utilizador comprar um item.
export interface PurchasePayload {
    userId: number;
    itemId: number;
}