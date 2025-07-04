'use client';

import React, { useState } from 'react';
import { useGetReviewsByGymIdQuery, useDeleteGymMutation, type Gym, type Review } from '@/app/store/gymsApi';
import CreateReviewModal from '@/app/components/forms/CreateReviewModal';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';


interface GymCardProps {
    gym: Gym;
}

const ReviewItem = ({ review }: { review: Review }) => (
    <div className="border-t border-gray-600 p-3">
        <div className="flex justify-between items-center">
            <span className="font-bold text-sm">{review.userName}</span>
            <span className="text-yellow-400 text-sm">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
        </div>
        <p className="text-gray-300 text-sm mt-1">{review.comment}</p>
    </div>
);


export default function GymCard({ gym }: GymCardProps) {
    const [showReviews, setShowReviews] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const locale = useLocale();

    const userRoles = useSelector((state: RootState) => state.auth?.roles || []);
    console.log("Roles do usuário no Card da Academia:", userRoles);

    const isAdmin = userRoles.includes("ROLE_ADMIN");
    const isGymOwner = userRoles.includes("ROLE_GYM_OWNER");
    const canReview = userRoles.includes("ROLE_USER") || isAdmin; 

    const canManageOrAdmin = isGymOwner || isAdmin;


    const [deleteGym, { isLoading: isDeleting }] = useDeleteGymMutation();

    const {
        data: reviews,
        isLoading: isLoadingReviews,
        error: reviewsError
    } = useGetReviewsByGymIdQuery(gym.id, {
        skip: !showReviews,
    });


    const handleDelete = async () => {
        if (window.confirm('Tem a certeza de que deseja excluir esta academia? Esta ação é irreversível.')) {
            try {
                await deleteGym(gym.id).unwrap();
            } catch (err) {
                console.error('Falha ao excluir academia:', err);
                alert('Ocorreu um erro ao excluir a academia.');
            }
        }
    };

    return (
        <>
            <div className="gym-card bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm flex flex-col">
                <img
                    src={gym.imageUrl}
                    alt={`Foto da ${gym.name}`}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4 flex-grow">
                    <h2 className="text-2xl font-bold mb-2">{gym.name}</h2>
                    <p className="text-gray-400 mb-1"><strong>Endereço:</strong> {gym.address}</p>
                    <p className="text-gray-400"><strong>Telefone:</strong> {gym.phone}</p>
                </div>

                {canManageOrAdmin && (
                    <div className="flex p-2 bg-gray-900 border-t border-gray-700">
                        <Link
                            href={`/${locale}/gyms/edit/${gym.id}`}
                            className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-md text-sm mx-1 transition-colors"
                        >
                            Editar
                        </Link>
                        {isAdmin && (
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-md text-sm mx-1 transition-colors disabled:opacity-50"
                            >
                                {isDeleting ? 'A excluir...' : 'Excluir'}
                            </button>
                        )}
                    </div>
                )}

                <div className="border-t border-gray-700 p-4 space-y-3">
                    {canReview && (
                        <button
                            onClick={() => setIsReviewModalOpen(true)}
                            className="text-center w-full bg-indigo-600 hover:bg-indigo-500 p-2 rounded-md text-sm font-semibold"
                        >
                            Deixar uma Avaliação
                        </button>
                    )}

                    <button
                        onClick={() => setShowReviews(!showReviews)}
                        className="text-center w-full bg-gray-700 hover:bg-gray-600 p-2 rounded-md text-sm"
                    >
                        {showReviews ? 'Ocultar Avaliações' : `Mostrar Avaliações`}
                    </button>

                    {showReviews && (
                        <div className="mt-4">
                            {isLoadingReviews && <p>A carregar avaliações...</p>}
                            {reviewsError && <p className="text-red-400">Erro ao carregar avaliações.</p>}
                            {reviews && reviews.length > 0 && reviews.map(review => (
                                <ReviewItem key={review.id} review={review} />
                            ))}
                            {reviews && reviews.length === 0 && <p className="text-sm text-gray-400 mt-2">Nenhuma avaliação ainda.</p>}
                        </div>
                    )}
                </div>
            </div>

            {isReviewModalOpen && (
                <CreateReviewModal
                    gymId={gym.id}
                    onClose={() => setIsReviewModalOpen(false)}
                />
            )}
        </>
    );
}