"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { Locale } from "@/lib/dictionary";

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("bn");
  const router = useRouter();

  useEffect(() => {
    // Get saved locale from localStorage if available
    const savedLocale = localStorage.getItem("locale") as Locale | null;
    if (savedLocale && (savedLocale === "en" || savedLocale === "bn")) {
      setLocale(savedLocale);
    }
  }, []);

  useEffect(() => {
    // Save locale to localStorage when it changes
    localStorage.setItem("locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const toggleLocale = () => {
    const newLocale = locale === "bn" ? "en" : "bn";
    setLocale(newLocale);

    // Refresh the page to apply new language
    router.refresh();
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
