'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

const ContactForm = () => {
  const t = useTranslations('ContactPage.Form');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      errors.name = t('nameRequired');
    }
    if (!formData.email.trim()) {
      errors.email = t('emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t('emailInvalid');
    }
    if (!formData.subject.trim()) {
      errors.subject = t('subjectRequired');
    }
    if (!formData.message.trim()) {
      errors.message = t('messageRequired');
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setStatus('loading');
    setFormErrors({}); 

    try {
      console.log('Dados do formulário para envio:', formData);

      await new Promise((resolve) => setTimeout(resolve, 2000)); 

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
      <div className="mb-6">
        <label htmlFor="name" className="block text-gray-200 text-sm font-semibold mb-2">
          {t('nameLabel')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-gray-700 text-white rounded-md border focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ${formErrors.name ? 'border-red-500' : 'border-gray-600'}`}
          placeholder={t('namePlaceholder')}
        />
        {formErrors.name && <p className="text-red-500 text-xs italic mt-1">{formErrors.name}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-200 text-sm font-semibold mb-2">
          {t('emailLabel')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-gray-700 text-white rounded-md border focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ${formErrors.email ? 'border-red-500' : 'border-gray-600'}`}
          placeholder={t('emailPlaceholder')}
        />
        {formErrors.email && <p className="text-red-500 text-xs italic mt-1">{formErrors.email}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="subject" className="block text-gray-200 text-sm font-semibold mb-2">
          {t('subjectLabel')}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-gray-700 text-white rounded-md border focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ${formErrors.subject ? 'border-red-500' : 'border-gray-600'}`}
          placeholder={t('subjectPlaceholder')}
        />
        {formErrors.subject && <p className="text-red-500 text-xs italic mt-1">{formErrors.subject}</p>}
      </div>

      <div className="mb-8">
        <label htmlFor="message" className="block text-gray-200 text-sm font-semibold mb-2">
          {t('messageLabel')}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6} 
          className={`w-full px-4 py-3 bg-gray-700 text-white rounded-md border focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ${formErrors.message ? 'border-red-500' : 'border-gray-600'}`}
          placeholder={t('messagePlaceholder')}
        ></textarea>
        {formErrors.message && <p className="text-red-500 text-xs italic mt-1">{formErrors.message}</p>}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-md
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800
                     transition-colors duration-300 w-full sm:w-auto
                     disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? t('sending') : t('sendButton')}
        </button>

        {status === 'success' && (
          <p className="text-green-500 text-sm font-medium mt-2 sm:mt-0">{t('successMessage')}</p>
        )}
        {status === 'error' && (
          <p className="text-red-500 text-sm font-medium mt-2 sm:mt-0">{t('errorMessage')}</p>
        )}
      </div>
    </form>
  );
};

export default ContactForm;