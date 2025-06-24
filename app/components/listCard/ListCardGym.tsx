"use client";
import React from "react";
import GymCard from "../card/CardGym";

// Tipo do produto (simplificado, ajuste conforme necessário)
interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  reviews: {
    rating: number;
    comment: string;
    reviewerName: string;
  }[];
}

interface ListCardProps {
  products: Product[];
}

export default function ListCard ({ products }: ListCardProps) {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {products.map((product) => (
        <GymCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
