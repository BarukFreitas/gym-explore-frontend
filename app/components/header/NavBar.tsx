'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

import { FaBars, FaTimes } from 'react-icons/fa';
import gymExploreLogo from '@/public/logo.png';
import ButtonLogin from '../button/ButtonLogin';
import NavBarLogado from './NavBarLogado'; // Importa NavBarLogado, com as props tipadas corretamente agora
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "@/app/store/store";
import { clearCredentials } from "@/app/store/authSlice";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrolled, setScrolled] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const username = useSelector((state: RootState) => state.auth.username);

  const isContactPage = pathname.includes('/contact') || pathname.includes('/contato');

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearCredentials());
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = isContactPage ? 50 : 200;

      if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY || currentScrollY <= scrollThreshold / 2) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      setScrolled(currentScrollY > 10 ? 1 : 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isContactPage]);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { label: t("home"), href: `/${locale}/` },
    { label: t("about"), href: `/${locale}/sobre` },
    { label: t("services"), href: `/${locale}/servicos` },
    { label: t("contact"), href: `/${locale}/contato` },
  ];

  const navbarClasses = `
    fixed top-0 left-0 right-0 w-full
    py-4 px-4 md:px-8 lg:px-16
    z-[100]
    transition-all duration-300 ease-out
    ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
    ${(scrolled || mobileMenuOpen) ? 'bg-gray-900' : 'bg-transparent'}
  `;

  return (
    <>
      {isLoggedIn ? (
        <NavBarLogado onLogout={handleLogout} username={username || "Usuário"} />
      ) : (
        <nav className={navbarClasses}>
          <div className="container mx-auto flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href={`/${locale}/`}>
                <Image
                  src={gymExploreLogo}
                  alt="Gym Explore Logo"
                  width={70}
                  height={55}
                  priority
                  className="cursor-pointer"
                />
              </Link>
            </motion.div>

            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Link
                    href={link.href}
                    className="text-white hover:text-green-500 font-semibold hover:scale-105 transition-transform duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden md:block"
            >
              {!isLoggedIn && <ButtonLogin />}
            </motion.div>

            <div className="md:hidden">
              <button
                onClick={handleMobileMenuToggle}
                className="text-white focus:outline-none"
              >
                <FaBars className="text-2xl" />
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? '0%' : '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            // CORREÇÃO APLICADA AQUI: Adicionado bg-black bg-opacity-100 para garantir opacidade total
            className={`fixed top-0 right-0 h-full w-64 bg-black bg-opacity-100 border-l border-gray-700 shadow-lg z-50
              transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
              transition-transform duration-300 ease-in-out md:hidden`}
            style={{ pointerEvents: mobileMenuOpen ? 'auto' : 'none' }}
          >
            <div className="flex justify-end p-4">
              <button onClick={handleMobileMenuToggle} className="text-white focus:outline-none">
                <FaTimes className="text-2xl" />
              </button>
            </div>
            <ul className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={handleMobileMenuToggle}
                    className="block text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-4 pt-4 border-t border-gray-700">
                {!isLoggedIn && (
                  <Link
                    href={`/${locale}/auth`}
                    onClick={handleMobileMenuToggle}
                    className="block bg-green-600 text-white text-center py-2 rounded-md font-semibold hover:bg-green-700 transition-colors duration-300"
                  >
                    {t("joinNow")}
                  </Link>
                )}
                {isLoggedIn && (
                  <button
                    onClick={() => { handleLogout(); handleMobileMenuToggle(); }}
                    className="block bg-red-600 text-white text-center py-2 rounded-md font-semibold hover:bg-red-700 transition-colors duration-300 w-full"
                  >
                    {t("logoutButton")}
                  </button>
                )}
              </li>
            </ul>
          </motion.div>
        </nav>
      )}
    </>
  );
};

export default Navbar;