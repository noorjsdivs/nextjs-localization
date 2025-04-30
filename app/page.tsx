import LanguageDropdown from "@/components/LanguageDropdown";
import TranslatedText from "@/components/TranslatedText";
import { getDictionary } from "@/lib/dictionary";
export default async function Home() {
  const enDictionary = await getDictionary("en");
  const bnDictionary = await getDictionary("bn");
  const esDictionary = await getDictionary("es");

  const dictionaries = {
    en: enDictionary,
    bn: bnDictionary,
    es: esDictionary,
  };
  return (
    <div className="px-10 py-5 max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-5 justify-between">
        <div>
          <h1 className="text-3xl font-semibold">
            <TranslatedText dictionaries={dictionaries} path="common.title" />
          </h1>
          <p className="text-sm font-normal flex items-center gap-1">
            Active Language:{" "}
            <span className="text-base font-semibold tracking-wide text-blue-600">
              {" "}
              <TranslatedText
                dictionaries={dictionaries}
                path="common.activeLanguage"
              />
            </span>
          </p>
        </div>
        <LanguageDropdown />
      </div>
      <div className="pt-5 max-w-5xl">
        <p className="text-base text-gray-700">
          <TranslatedText dictionaries={dictionaries} path="common.intro" />
        </p>
        <div className="mt-3">
          <h2 className="font-medium text-lg mb-2">
            <TranslatedText
              dictionaries={dictionaries}
              path="common.subTitle"
            />
          </h2>
          <TranslatedText
            dictionaries={dictionaries}
            path="common.description"
          />
        </div>
      </div>
    </div>
  );
}
