"use client";

import React from 'react';

import { useGetStoreItemsQuery } from '@/app/store/gymsApi';
import { useGetUserPointsQuery } from '@/app/store/authApi'; // Corrigido para apontar para authApi

import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import StoreItemCard from '@/app/components/store/StoreItemCard';
import Loading from '@/app/components/loading/Loading';
import { Alert } from '@mui/material';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function StorePage() {
    const { data: items, isLoading: isLoadingItems, error: itemsError } = useGetStoreItemsQuery();
    const locale = useLocale();

    const { id: userId, roles, points: userPoints } = useSelector((state: RootState) => state.auth);

    // Agora o TypeScript encontra o hook porque o import está correto
    const { data: pointsData, isLoading: isLoadingPoints } = useGetUserPointsQuery(userId!, {
        skip: !userId,
    });

    const isUserAdmin = (roles || []).includes("ROLE_ADMIN");

    if (isLoadingItems || isLoadingPoints) return <Loading />;
    if (itemsError) return <Alert severity="error">Não foi possível carregar os itens da loja.</Alert>;

    return (
        <div className="container mx-auto px-4 py-8 mt-16 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-white">Loja de Pontos</h1>

                {isUserAdmin && (
                    <Link href={`/${locale}/admin/store`}>
                        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Adicionar Novo Item
                        </button>
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items?.map(item => (
                    <StoreItemCard
                        key={item.id}
                        item={item}
                        // Use os pontos do hook, que estão sempre atualizados
                        currentUserPoints={pointsData?.points || 0}
                        userId={userId!}
                    />
                ))}
            </div>
        </div>
    );
}