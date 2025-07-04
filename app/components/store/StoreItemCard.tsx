"use client";

import React from 'react';
import { usePurchaseStoreItemMutation } from '@/app/store/gymsApi';
import { toast } from 'react-toastify';
import { StoreItem } from '@/app/types/store';

interface StoreItemCardProps {
    item: StoreItem;
    currentUserPoints: number;
    userId: number;
}

export default function StoreItemCard({ item, currentUserPoints, userId }: StoreItemCardProps) {
    const [purchaseItem, { isLoading }] = usePurchaseStoreItemMutation();

    const canAfford = currentUserPoints >= item.pointsCost;

    const handlePurchase = async () => {
        if (!canAfford) {
            toast.error("Você não tem pontos suficientes!");
            return;
        }

        try {
            await purchaseItem({ userId, itemId: item.id }).unwrap();
            toast.success(`"${item.name}" trocado com sucesso!`);
        } catch (err: any) {
            console.error("Falha ao trocar item:", err);
            toast.error(err.data?.error || "Ocorreu um erro ao realizar a troca.");
        }
    };

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col justify-between shadow-lg">
            <div>
                <h3 className="text-xl font-bold text-white">{item.name}</h3>
                <p className="text-gray-400 mt-2">{item.description}</p>
            </div>
            <div className="mt-6">
                <div className="flex items-center justify-center text-2xl font-bold text-yellow-400 mb-4">
                    <span className="mr-2">★</span>
                    <span>{item.pointsCost} Fitcoins</span>
                </div>
                <button
                    onClick={handlePurchase}
                    disabled={!canAfford || isLoading}
                    className="w-full py-2 px-4 rounded-md font-semibold text-white transition-colors duration-200 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'A Processar...' : (canAfford ? 'Trocar Pontos' : 'Pontos Insuficientes')}
                </button>
            </div>
        </div>
    );
}