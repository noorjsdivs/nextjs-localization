"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { Dictionary, Locale } from "@/lib/dictionary";

type TranslatedTextProps = {
  path: string; // dot notation path like "common.title"
  dictionaries: {
    [key in Locale]: Dictionary;
  };
};

export default function TranslatedText({
  path,
  dictionaries,
}: TranslatedTextProps) {
  const { locale } = useLanguage();
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (!dictionaries || !dictionaries[locale]) {
      setText(path);
      return;
    }

    const dictionary = dictionaries[locale];
    const keys = path.split(".");

    // Use type assertion with unknown as intermediate step
    let value: unknown = dictionary;

    for (const key of keys) {
      if (value && typeof value === "object" && key in value) {
        // Use type assertion to tell TypeScript this access is valid
        value = (value as Record<string, unknown>)[key];
      } else {
        value = path; // Fallback to the path if translation not found
        break;
      }
    }

    setText(typeof value === "string" ? value : path);
  }, [locale, path, dictionaries]);

  return <>{text}</>;
}
