import { useTranslations } from "next-intl";
import Link from "next/link";

export default function ButtonLogin() {
  const t = useTranslations('Navbar');

  return (
    <Link href="/auth" passHref>
      <button className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300">
        {t('joinNow')}
      </button>
    </Link>
  );
}