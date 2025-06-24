import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import ContactForm from '@/app/components/contact/ContactForm';
import ContactInfo from '@/app/components/contact/ContactInfo';

import contactBgImage from '@/public/academia_contato.webp';

export const metadata = {
  title: 'Gym Explore - Contato',
  description: 'Entre em contato com a Gym Explore para dúvidas, parcerias ou suporte.',
};

export default function Contato() {
  const t = useTranslations('ContactPage');

  return (
    <section className="relative min-h-screen bg-gray-900 text-white py-16 md:py-24 flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src={contactBgImage}
          alt={t('imageAlt')}
          layout="fill"
          objectFit="cover"
          className="opacity-75"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-12 drop-shadow-lg">
          {t('title')}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-semibold mb-6 text-center md:text-left">
              {t('formHeading')}
            </h2>
            <ContactForm />
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-6 text-center md:text-left">
              {t('infoHeading')}
            </h2>
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
}