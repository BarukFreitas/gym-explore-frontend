import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import ServiceCard from '@/app/components/services/ServiceCard';
import FeaturesGrid from '@/app/components/services/FeaturesGrid';

import servicesBgImage from '@/public/academia_servicos.png';

export const metadata = {
  title: 'Gym Explore - Nossos Serviços',
  description: 'Descubra como a Gym Explore conecta pessoas e academias, permitindo que você compartilhe sua jornada fitness e ganhe recompensas.',
};

export default function ServicesPage() {
  const t = useTranslations('ServicesPage');
  const serviceCardsData = [
    {
      title: t('card1Title'), 
      description: t('card1Description'),
      icon: '/comunidade.png',
    },
    {
      title: t('card2Title'),
      description: t('card2Description'),
      icon: '/jornada.jpg',
    },
    {
      title: t('card3Title'),
      description: t('card3Description'), 
      icon: '/perfil.png', 
    },
    {
      title: t('card4Title'), 
      description: t('card4Description'), 
      icon: '/fitcoin.avif',
    },
  ];

  return (
    <section className="relative min-h-screen bg-gray-900 text-white pt-16 md:pt-24 pb-16">
      <div className="absolute inset-0 z-0">
        <Image
          src={servicesBgImage}
          alt={t('imageAlt')}
          layout="fill"
          objectFit="cover"
          className="opacity-75"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-6 drop-shadow-lg">
          {t('title')} 
        </h1>
        <p className="text-lg md:text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
          {t('subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {serviceCardsData.map((card, index) => (
            <ServiceCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              delay={index * 0.1} 
            />
          ))}
        </div>

        <div className="bg-gray-800 p-8 md:p-12 rounded-lg shadow-xl border border-gray-700">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                {t('featuresHeading')}
            </h2>
            <FeaturesGrid />
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl md:text-2xl font-semibold mb-6">
            {t('ctaText')}
          </p>
          <a
            href={`/${useLocale()}/join`}
            className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg
                       hover:bg-green-700 transition-colors duration-300 shadow-lg"
          >
            {t('ctaButton')}
          </a>
        </div>

      </div>
    </section>
  );
}