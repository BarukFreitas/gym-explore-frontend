"use client";

import React, { useState, useEffect } from 'react';
import { useAddStoreItemMutation } from '@/app/store/gymsApi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function AdminCreateStoreItemPage() {
    const [addStoreItem, { isLoading, isSuccess }] = useAddStoreItemMutation();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        pointsCost: 0,
    });
    const router = useRouter();
    const locale = useLocale();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Item adicionado à loja com sucesso!");
            router.push(`/${locale}/store`);
        }
    }, [isSuccess, router, locale]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addStoreItem({
                ...formData,
                pointsCost: Number(formData.pointsCost)
            }).unwrap();
        } catch (err) {
            console.error("Falha ao criar item:", err);
            toast.error("Ocorreu um erro ao criar o item.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
                <h1 className="text-3xl font-bold text-white text-center">Adicionar Novo Item à Loja</h1>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nome do Item</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md" />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300">Descrição</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md" />
                </div>
                <div>
                    <label htmlFor="pointsCost" className="block text-sm font-medium text-gray-300">Custo em Pontos</label>
                    <input type="number" name="pointsCost" value={formData.pointsCost} onChange={handleChange} required min="1" className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md" />
                </div>
                <button type="submit" disabled={isLoading} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md disabled:opacity-50">
                    {isLoading ? 'A Adicionar...' : 'Adicionar Item'}
                </button>
            </form>
        </div>
    );
}