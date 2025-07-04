"use client";

import React, { useState } from 'react';
import { useAddGymMutation } from '@/app/store/gymsApi';

import type { GymCreatePayload } from '@/app/store/gymsApi';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function CreateGymForm() {
    const [addGym, { isLoading, isSuccess, error }] = useAddGymMutation();
    const router = useRouter();
    const locale = useLocale();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newGym: GymCreatePayload = {
            name,
            address,
            phone,
            imageUrl,
        };

        try {
            await addGym(newGym).unwrap();
            router.push(`/${locale}/gyms`);
        } catch (err) {
            console.error('Falha ao criar academia:', err);
        }
    };

    return (
        <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">Adicionar Nova Academia</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nome da Academia</label>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-300">Endereço</label>
                    <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Telefone</label>
                    <input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300">URL da Imagem</label>
                    <input id="imageUrl" type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>
                <div>
                    <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                        {isLoading ? 'Salvando...' : 'Salvar Academia'}
                    </button>
                </div>
                {error && <p className="text-red-500 text-center">Ocorreu um erro. Tente novamente.</p>}
                {isSuccess && <p className="text-green-500 text-center">Academia criada com sucesso!</p>}
            </form>
        </div>
    );
}