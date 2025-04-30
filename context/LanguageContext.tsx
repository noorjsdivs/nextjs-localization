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
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Map country/region codes to locales
const countryToLocaleMap: Record<string, Locale> = {
  // English-speaking countries
  US: "en",
  UK: "en",
  CA: "en",
  AU: "en",
  NZ: "en",
  // Bengali-speaking countries
  BD: "bn",
  IN: "bn",
  // Spanish-speaking countries
  ES: "es",
  MX: "es",
  AR: "es",
  CO: "es",
  CL: "es",
  PE: "es",
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en"); // Default to English
  const router = useRouter();

  useEffect(() => {
    const detectAndSetLanguage = async () => {
      // First check if user has a saved preference
      const savedLocale = localStorage.getItem("locale") as Locale | null;
      if (
        savedLocale &&
        (savedLocale === "en" || savedLocale === "bn" || savedLocale === "es")
      ) {
        setLocale(savedLocale);
        return;
      }

      try {
        // Try to get user's country from IP geolocation
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const countryCode = data.country_code;

        // Map country to locale or fall back to browser language
        if (countryCode && countryToLocaleMap[countryCode]) {
          setLocale(countryToLocaleMap[countryCode]);
        } else {
          // Fall back to browser language preference
          const browserLang = navigator.language.split("-")[0];
          if (browserLang === "bn") setLocale("bn");
          else if (browserLang === "es") setLocale("es");
          // Default is already 'en'
        }
      } catch (error) {
        console.error("Error detecting location:", error);
        // Keep default 'en' if detection fails
      }
    };

    detectAndSetLanguage();
  }, []);

  useEffect(() => {
    // Save locale to localStorage when it changes
    localStorage.setItem("locale", locale);
    document.documentElement.lang = locale;

    // Refresh the page to apply new language
    router.refresh();
  }, [locale, router]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
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
