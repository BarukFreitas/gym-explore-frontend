"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { clearCredentials } from "@/app/store/authSlice";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export default function NavBarLogado() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Navbar');

  // >>> CORREÇÃO: Obter os dados diretamente do estado, como definido no seu slice <<<
  const { username, email } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(clearCredentials()); // Despacha a ação correta
    setIsModalOpen(false);
    router.push(`/${locale}/`);
  };

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const loggedNavLinks = [
    { label: t("feed"), href: `/${locale}/feed` },
    { label: t("gyms"), href: `/${locale}/gyms` },
  ];

  return (
      <>
        <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow">
          {/* ... (código da barra de navegação que já estava correto) ... */}
          <div className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={50} height={50} className="cursor-pointer" />
            <span className="ml-2 font-bold text-lg">Gym Explore</span>
          </div>
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {loggedNavLinks.map((link) => (
                <Link key={link.label} href={link.href} className="text-white hover:text-green-500 font-semibold hover:scale-105 transition-transform duration-300">
                  {link.label}
                </Link>
            ))}
          </div>
          <button onClick={handleToggleModal} className="text-2xl text-white focus:outline-none">
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
                <button onClick={handleToggleModal} className="absolute top-4 right-4 text-white text-2xl focus:outline-none" aria-label="Fechar modal">
                  <FaTimes />
                </button>

                {/* >>> CORREÇÃO: Usa as variáveis obtidas diretamente do useSelector <<< */}
                <div className="flex flex-col items-center mb-4 mt-8">
                  <h2 className="mt-2 font-bold text-lg">{username || "Utilizador"}</h2>
                </div>
                <p className="text-center text-gray-400 text-sm mb-6">{email}</p>

                <div className="flex flex-col space-y-2">
                  {loggedNavLinks.map((link) => (
                      <Link key={link.label} href={link.href} onClick={handleToggleModal} className="block text-white hover:bg-green-700 hover:text-white px-4 py-2 rounded-md transition-colors duration-200">
                        {link.label}
                      </Link>
                  ))}
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <button className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition w-full" onClick={handleLogoutClick}>
                      {t("logoutButton")}
                    </button>
                  </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </>
  );
}