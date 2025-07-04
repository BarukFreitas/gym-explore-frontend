'use client';

import { useEffect, useState } from "react";
import ListCard from "@/app/components/listCard/ListCardGym";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Loading from "@/app/components/loading/Loading";
import { useGetAllGymsQuery } from "@/app/store/gymsApi";
import { useLocale } from "next-intl";
import Link from 'next/link';

export default function Gyms() {
  const router = useRouter();
  const locale = useLocale();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userRoles = useSelector((state: RootState) => state.auth?.roles || []);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const { data: gyms, isLoading, error } = useGetAllGymsQuery();

  const canAddGym = (userRoles || []).includes("ROLE_GYM_OWNER") || (userRoles || []).includes("ROLE_ADMIN");


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

  if (checkingAuth) return <Loading />;
  if (!isLoggedIn) return <Loading />;
  if (isLoading) return <Loading />;
  if (error) return <p>Erro ao buscar academias.</p>;

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-8 mt-16">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold">Academias em destaque</h1>

        {canAddGym && (
          <Link
            href={`/${locale}/gyms/create`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
          >
            Adicionar Nova Academia
          </Link>
        )}
      </div>

      {gyms && <ListCard gyms={gyms} />}
    </div>
  );
}