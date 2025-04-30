// import 'server-only';

// Define the Locale type
export type Locale = "en" | "bn" | "es";

export type Dictionary = {
  common: {
    title: string;
    intro: string;
    subTitle: string;
    description: string;
    activeLanguage: string;
  };
};

export async function getDictionary(locale: string): Promise<Dictionary> {
  return (await import(`../dictionaries/${locale}.json`)).default as Dictionary;
}
