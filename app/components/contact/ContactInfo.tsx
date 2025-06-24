import React from 'react';
import { useTranslations } from 'next-intl';

const ContactInfo = () => {
  const t = useTranslations('ContactPage.Info');

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-3 flex items-center text-green-500">
          <span className="text-2xl mr-3">📍</span>
          {t('addressTitle')}
        </h3>
        <p className="text-gray-300 text-lg mb-1">{t('addressLine1')}</p>
        <p className="text-gray-300 text-lg">{t('addressLine2')}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-3 flex items-center text-green-500">
          <span className="text-2xl mr-3">📞</span>
          {t('phoneTitle')}
        </h3>
        <a href={`tel:${t('phoneNumber').replace(/\D/g, '')}`} className="text-gray-300 text-lg hover:underline">
          {t('phoneNumber')}
        </a>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-3 flex items-center text-green-500">
          <span className="text-2xl mr-3">✉️</span>
          {t('emailTitle')}
        </h3>
        <a href={`mailto:${t('emailAddress')}`} className="text-gray-300 text-lg hover:underline">
          {t('emailAddress')}
        </a>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-3 flex items-center text-green-500">
          <span className="text-2xl mr-3">⏰</span>
          {t('hoursTitle')}
        </h3>
        <p className="text-gray-300 text-lg">{t('hoursDetails')}</p>
      </div>

      <div className="mt-10 text-center md:text-left">
        <a
          href="https://www.google.com/maps/place/RW+-+Centro+de+Treinamento/@-8.9056101,-36.4898095,17z/data=!4m6!3m5!1s0x7070d3b8177dd4d:0x6e348ea7e9be9c75!8m2!3d-8.9060822!4d-36.4899328!16s%2Fg%2F11h8h9st2d?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-md
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800
                     transition-colors duration-300"
        >
          {t('viewOnMap')}
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;