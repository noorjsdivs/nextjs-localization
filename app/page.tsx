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
      {/* <div className="flex flex-col md:flex-row items-start md:items-center gap-5 justify-between">
        <h1 className="text-3xl font-semibold">
          Using Localization in Nextjs application
        </h1>
      </div>
      <div className="pt-5 max-w-5xl">
        <p className="text-base text-gray-700">
          Next.js, a powerful React framework, has become a top choice for web
          development due to its versatility, performance optimizations, and
          developer-friendly features. Below, I’ll explain why Next.js is
          considered "perfect" for modern web development, focusing on its
          ability to handle real-time data and its overall strengths, while
          addressing potential drawbacks for a balanced perspective. This answer
          is comprehensive, up-to-date as of April 2025, and includes insights
          from recent web sources and posts on X to reflect real-world usage and
          sentiment.
        </p>
        <div className="mt-3">
          <h2 className="font-medium text-lg mb-2">
            Why Next.js is Perfect for Web Development
          </h2>
          <p className="text-base text-gray-700">
            Next.js offers a versatile set of rendering options tailored for
            performance, real-time data, and SEO. Server-Side Rendering (SSR)
            generates pages on the server per request, delivering fresh,
            up-to-date content ideal for dynamic applications like user
            dashboards or e-commerce platforms, where real-time data (e.g.,
            stock availability or user-specific content) is crucial, while also
            reducing initial load times and boosting SEO with fully rendered
            HTML. Static Site Generation (SSG) pre-renders pages at build time
            for lightning-fast load times and minimal server load, perfect for
            content-heavy sites like blogs or documentation with infrequent
            updates; enhanced by Incremental Static Regeneration (ISR), SSG
            allows periodic updates (e.g., every 60 seconds) without rebuilding,
            balancing performance and real-time needs for scenarios like news
            feeds or product listings. Client-Side Rendering (CSR) enables
            dynamic, browser-based rendering for highly interactive components,
            such as real-time trackers or live chats, complementing static or
            server-rendered pages. React Server Components (RSCs), introduced in
            Next.js 13, streamline real-time data applications by executing
            logic and fetching data on the server, minimizing client-side
            JavaScript, reducing roundtrips, and enhancing security by keeping
            sensitive logic server-side. This hybrid approach empowers
            developers to optimize performance, interactivity, and SEO for
            diverse use cases.
          </p>
        </div>
      </div> */}
    </div>
  );
}
