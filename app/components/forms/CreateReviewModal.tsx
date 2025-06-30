"use client";

import React, { useState } from 'react';
import { useAddReviewMutation } from '@/app/store/gymsApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

interface CreateReviewModalProps {
    gymId: number;
    onClose: () => void;
}

export default function CreateReviewModal({ gymId, onClose }: CreateReviewModalProps) {
    const [addReview, { isLoading }] = useAddReviewMutation();
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const userId = useSelector((state: RootState) => state.auth.id);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            setError('Por favor, selecione uma nota.');
            return;
        }
        if (!userId) {
            setError('Não foi possível identificar o utilizador. Por favor, faça login novamente.');
            return;
        }

        try {
            await addReview({ gymId, userId, comment, rating }).unwrap();
            onClose();
        } catch (err) {
            console.error('Falha ao enviar avaliação:', err);
            setError('Ocorreu um erro ao enviar a sua avaliação.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-4">Deixe a sua Avaliação</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Nota</label>
                        <div className="flex text-3xl">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-500'}`}
                                    onClick={() => { setRating(star); setError(null); }}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="comment" className="block text-gray-300 mb-2">Comentário (opcional)</label>
                        <textarea
                            id="comment"
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full bg-gray-700 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-2 px-4 bg-gray-600 hover:bg-gray-500 rounded-md"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-500 rounded-md disabled:opacity-50"
                        >
                            {isLoading ? 'A Enviar...' : 'Enviar Avaliação'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}