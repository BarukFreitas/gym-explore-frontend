"use client";
import React from "react";
import GymCard from "../card/CardGym";

// 1. Defina a interface para uma única Academia.
//    Ela deve corresponder exatamente ao que sua API envia.
interface Gym {
  id: number;
  name: string;
  address: string;
  phone: string;
  imageUrl: string;
}

// 2. Defina a interface para as props que este componente recebe.
//    Ele agora espera um array de 'Gym' chamado 'gyms'.
interface ListCardProps {
  gyms: Gym[];
}

// 3. Receba 'gyms' como propriedade, em vez de 'products'.
export default function ListCard({ gyms }: ListCardProps) {
  return (
      <div className="flex flex-wrap gap-6 justify-center">
        {/* 4. Faça o loop sobre a lista 'gyms' */}
        {gyms.map((gym) => (
            // 5. Passe cada objeto 'gym' para o componente GymCard.
            //    A propriedade agora se chama 'gym'.
            <GymCard
                key={gym.id}
                gym={gym}
            />
        ))}
      </div>
  );
}