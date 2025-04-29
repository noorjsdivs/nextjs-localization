"use client";
import { useLanguage } from "@/context/LanguageContext";
import { Dictionary, getDictionary } from "@/lib/dictionary";
import React, { useEffect, useState } from "react";
import TranslatedText from "./TranslatedText";

const ToggleBtn = () => {
  const { toggleLocale } = useLanguage();
  const [dictionaries, setDictionaries] = useState<{
    en: Dictionary;
    bn: Dictionary;
  }>({
    en: {} as Dictionary,
    bn: {} as Dictionary,
  });
  useEffect(() => {
    const loadDictionaries = async () => {
      const enDict = await getDictionary("en");
      const bnDict = await getDictionary("bn");
      setDictionaries({
        en: enDict,
        bn: bnDict,
      });
    };

    loadDictionaries();
  }, []);

  return (
    <button
      onClick={toggleLocale}
      className="text-blue-600 font-bold underline underline-offset-2 decoration-1 hover:text-blue-700 ease-in-out duration-300 cursor-pointer"
    >
      <TranslatedText path="common.buttonText" dictionaries={dictionaries} />
    </button>
  );
};

export default ToggleBtn;
