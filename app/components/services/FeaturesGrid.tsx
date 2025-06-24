import React from 'react';
import { useTranslations } from 'next-intl';

interface FeatureItemProps {
  title: string;
  description: string;
  iconEmoji: string; 
}

const FeatureItem = ({ title, description, iconEmoji }: FeatureItemProps) => {
  return (
    <div className="flex flex-col items-center text-center p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-md">
      <div className="text-4xl text-green-500 mb-3">
        {iconEmoji} 
      </div>
      <h4 className="text-xl font-bold mb-2 text-white">{title}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};

const FeaturesGrid = () => {
  const t = useTranslations('ServicesPage.Features');

  const features = [
    {
      title: t('feature1Title'), 
      description: t('feature1Description'), 
      iconEmoji: '🤝',
    },
    {
      title: t('feature2Title'), 
      description: t('feature2Description'), 
      iconEmoji: '✍️',
    },
    {
      title: t('feature3Title'),
      description: t('feature3Description'), 
      iconEmoji: '🏆',
    },
    {
      title: t('feature4Title'), 
      description: t('feature4Description'), 
      iconEmoji: '🏢',
    },
    {
      title: t('feature5Title'), 
      description: t('feature5Description'), 
      iconEmoji: '📊',
    },
    {
      title: t('feature6Title'),
      description: t('feature6Description'), 
      iconEmoji: '💪',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <FeatureItem
          key={index}
          title={feature.title}
          description={feature.description}
          iconEmoji={feature.iconEmoji}
        />
      ))}
    </div>
  );
};

export default FeaturesGrid;