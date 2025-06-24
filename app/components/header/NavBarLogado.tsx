"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { clearUser } from "../button/loginSlice";

export default function HeaderWithModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { name, email, picture } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearUser());
    };
    const handleToggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    return (
        <>
            {/* Header */}
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
                <button
                    onClick={handleToggleModal}
                    className="text-2xl text-white focus:outline-none"
                >
                    {isModalOpen ? <FaTimes /> : <FaBars />}
                </button>
            </nav>

            {/* Modal com animação */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed top-0 right-0 h-full w-64 bg-gray-900 text-white shadow-lg z-50 flex flex-col p-4"
                    >
                        {/* Botão de fechar no topo direito */}
                        <button
                            onClick={handleToggleModal}
                            className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
                            aria-label="Fechar modal"
                        >
                            <FaTimes />
                        </button>
                        {/* Topo com foto e nome */}
                        <div className="flex flex-col items-center mb-4 mt-8">
                            <img
                                src={picture!}
                                alt="Foto do usuário"
                                className="rounded-full w-20 h-20 object-cover"
                            />
                            <h2 className="mt-2 font-bold text-lg">{name}</h2>
                        </div>

                        {/* Email */}
                        <p className="text-center text-gray-400 text-sm mb-6">{email}</p>

                        {/* Links */}
                        <div className="flex flex-col space-y-2">
                            <button
                                className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                                onClick={handleLogout}
                            >
                                Sair
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
