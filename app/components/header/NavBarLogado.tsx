// app/components/header/NavBarLogado.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { clearCredentials } from "@/app/store/authSlice";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link"; // Importar Link do Next.js
import { useTranslations } from "next-intl"; // Importar useTranslations

interface NavBarLogadoProps {
  onLogout: () => void;
  username: string;
}

export default function NavBarLogado({ onLogout, username }: NavBarLogadoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { email } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Navbar'); // Inicializar useTranslations

  const handleLogoutClick = () => {
    onLogout();
    setIsModalOpen(false);
    router.push(`/${locale}/`);
  };

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // Links específicos para a NavBarLogado
  const loggedNavLinks = [
    { label: t("feed"), href: `/${locale}/feed` }, // Link para o Feed
    { label: t("gyms"), href: `/${locale}/gyms` }, // Link para Academias
    // Adicione outros links que você queira que apareçam apenas para logados
    // Ex: { label: t("profile"), href: `/${locale}/profile` },
  ];

  return (
    <>
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="cursor-pointer"
          />
          <span className="ml-2 font-bold text-lg">Gym Explore</span>
        </div>
        {/* Opção desktop para links logados (se não usar modal) */}
        <div className="hidden md:flex space-x-6 lg:space-x-8">
          {loggedNavLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white hover:text-green-500 font-semibold hover:scale-105 transition-transform duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={handleToggleModal}
          className="text-2xl text-white focus:outline-none"
        >
          {isModalOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-64 bg-gray-900 text-white shadow-lg z-50 flex flex-col p-4"
          >
            <button
              onClick={handleToggleModal}
              className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
              aria-label="Fechar modal"
            >
              <FaTimes />
            </button>

            <div className="flex flex-col items-center mb-4 mt-8">
              <h2 className="mt-2 font-bold text-lg">{username || "Usuário"}</h2>
            </div>

            <p className="text-center text-gray-400 text-sm mb-6">{email}</p>

            <div className="flex flex-col space-y-2">
              {/* Links do modal/sidebar para usuários logados */}
              {loggedNavLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={handleToggleModal} // Fechar modal ao clicar no link
                  className="block text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-md transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-700"> {/* Separador para o botão de sair */}
                <button
                  className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition w-full"
                  onClick={handleLogoutClick}
                >
                  {t("logoutButton")} {/* Use a tradução para Sair */}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}