"use client";
import React from "react";
import GymCard from "../card/CardGym";

interface Gym {
  id: number;
  name: string;
  address: string;
  phone: string;
  imageUrl: string;
}

interface ListCardProps {
  gyms: Gym[];
}

export default function ListCard({ gyms }: ListCardProps) {
  return (
      <div className="flex flex-wrap gap-6 justify-center">
        {gyms.map((gym) => (
            <GymCard
                key={gym.id}
                gym={gym}
            />
        ))}
      </div>
  );
}