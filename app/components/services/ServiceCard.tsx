'use client'; 

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string; 
  delay?: number; 
}

const ServiceCard = ({ title, description, icon, delay = 0 }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: delay }}
      className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 flex flex-col items-center text-center h-full"
    >
      <div className="mb-4">
        <Image src={icon} alt={title} width={256} height={256} className="object-contain" />
      </div>
      <h3 className="text-2xl font-bold text-green-500 mb-3">{title}</h3>
      <p className="text-gray-300 text-base flex-grow">{description}</p>
    </motion.div>
  );
};

export default ServiceCard;