"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import sobreBG from "@/public/academia_sobre.webp";

export default function AboutPage() {
  const t = useTranslations("AboutPage");
  return (
    <>
      <main className="bg-gray-900 text-white min-h-screen pt-28">
        <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
          <Image
            src={sobreBG}
            alt="Fundo da página sobre nós: interior de academia com equipamentos"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="absolute inset-0 z-0"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-60 z-10"></div>{" "}
          <div className="relative z-20 text-center container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 animate-fade-in-up">
              {t("title")}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 animate-fade-in-up delay-200">
              {t("subtitle")}
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-primary">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-4xl">
            <div className="text-gray-300 leading-relaxed space-y-6 text-lg md:text-xl">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2").replace("[Year]", "2010")}</p>
              <p>{t("paragraph3")}</p>
              <p className="text-accent font-semibold mt-8 text-center md:text-left">
                {t("cta")}
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
