"use client";
import { useLanguage } from "@/context/LanguageContext";
import { Dictionary, getDictionary, Locale } from "@/lib/dictionary";
import React, { useEffect, useState } from "react";
import TranslatedText from "./TranslatedText";

const LanguageDropdown = () => {
  const { locale, setLocale } = useLanguage();
  const [dictionaries, setDictionaries] = useState<{
    en: Dictionary;
    bn: Dictionary;
    es: Dictionary;
  }>({
    en: {} as Dictionary,
    bn: {} as Dictionary,
    es: {} as Dictionary,
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadDictionaries = async () => {
      const enDict = await getDictionary("en");
      const bnDict = await getDictionary("bn");
      const esDict = await getDictionary("es");
      setDictionaries({
        en: enDict,
        bn: bnDict,
        es: esDict,
      });
    };

    loadDictionaries();
  }, []);

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-blue-600 font-bold border border-blue-300 rounded-md hover:bg-blue-50 ease-in-out duration-300"
      >
        <span>
          <TranslatedText
            path="common.activeLanguage"
            dictionaries={dictionaries}
          />
        </span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <ul className="py-1">
            <li>
              <button
                onClick={() => handleLanguageChange("en")}
                className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${
                  locale === "en" ? "bg-blue-100" : ""
                }`}
              >
                English
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLanguageChange("bn")}
                className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${
                  locale === "bn" ? "bg-blue-100" : ""
                }`}
              >
                বাংলা
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLanguageChange("es")}
                className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${
                  locale === "es" ? "bg-blue-100" : ""
                }`}
              >
                Español
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
