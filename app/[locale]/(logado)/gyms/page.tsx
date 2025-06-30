"use client";

import { useEffect, useState } from "react";
import ListCard from "@/app/components/listCard/ListCardGym";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Loading from "@/app/components/loading/Loading";
// 1. Importe o hook correto da sua nova API de academias
import { useGetAllGymsQuery } from "@/app/store/gymsApi"; // << MUDANÇA
import { useLocale } from "next-intl";



export default function Gyms() {
  const router = useRouter();
  const locale = useLocale();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // 3. Chame o novo hook para buscar as academias.
  //    Ele não precisa de parâmetros como limit/skip.
  const { data: gyms, isLoading, error } = useGetAllGymsQuery(); // << MUDANÇA

  // Lógica de autenticação (permanece a mesma)
  useEffect(() => {
    if (checkingAuth) {
      const timer = setTimeout(() => {
        if (!isLoggedIn) {
          router.push(`/${locale}/`);
        } else {
          setCheckingAuth(false);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, router, checkingAuth, locale]);

  // 4. Remova os `useEffect` que gerenciavam a paginação e o estado `allProducts`.
  //    Isso não é mais necessário, pois `useGetAllGymsQuery` já nos dá a lista completa.

  // Lógica de renderização de estado (carregando, erro)
  if (checkingAuth) return <Loading />;
  if (!isLoggedIn) return <Loading />;
  if (isLoading) return <Loading />; // Simplificado
  if (error) return <p>Erro ao buscar academias.</p>;

  return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold">Academias em destaque</h1>

        {/* 5. Passe a lista de academias para o componente ListCard */}
        {/* e renomeie a propriedade para algo como 'gyms' */}
        <ListCard gyms={gyms || []} />

      </div>
  );
}