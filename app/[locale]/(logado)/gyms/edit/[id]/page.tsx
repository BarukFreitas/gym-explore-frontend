"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetAllGymsQuery, useUpdateGymMutation, type GymCreatePayload } from '@/app/store/gymsApi';
import Loading from '@/app/components/loading/Loading';
import { useLocale } from 'next-intl';

export default function EditGymPage() {
    const params = useParams();
    const router = useRouter();
    const locale = useLocale();
    const gymId = Number(params.id);

    const { data: gyms, isLoading: isLoadingGyms } = useGetAllGymsQuery();
    const gymToEdit = gyms?.find(g => g.id === gymId);

    const [updateGym, { isLoading: isUpdating }] = useUpdateGymMutation();
    const [formData, setFormData] = useState<GymCreatePayload | null>(null);

    useEffect(() => {
        if (gymToEdit) {
            setFormData({
                name: gymToEdit.name,
                address: gymToEdit.address,
                phone: gymToEdit.phone,
                imageUrl: gymToEdit.imageUrl,
            });
        }
    }, [gymToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => prev ? { ...prev, [e.target.name]: e.target.value } : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        try {
            await updateGym({ id: gymId, body: formData }).unwrap();
            router.push(`/${locale}/gyms`);
        } catch (err) {
            console.error('Falha ao atualizar academia:', err);
            alert('Ocorreu um erro ao atualizar os dados.');
        }
    };

    if (isLoadingGyms || !formData) return <Loading />;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
            <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">Editar Academia</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nome da Academia</label>
                        <input name="name" type="text" value={formData.name} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-300">Endereço</label>
                        <input name="address" type="text" value={formData.address} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Telefone</label>
                        <input name="phone" type="text" value={formData.phone} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>

                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300">URL da Imagem</label>
                        <input name="imageUrl" type="url" value={formData.imageUrl} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>

                    <button type="submit" disabled={isUpdating} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                        {isUpdating ? 'A guardar...' : 'Guardar Alterações'}
                    </button>
                </form>
            </div>
        </div>
    );
}