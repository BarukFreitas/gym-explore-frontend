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