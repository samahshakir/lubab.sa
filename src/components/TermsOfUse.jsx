import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import client from "../sanityClient";
import { PortableText } from "@portabletext/react";

const TermsOfUse = () => {
  const { isArabic } = useLanguage();
  const [termsList, setTermsList] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "termsOfUse"]{
        _id,
        title_en,
        title_ar,
        content_en,
        content_ar
      }`)
      .then(setTermsList);
  }, []);

  if (!termsList.length) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className={`flex justify-center px-4 py-10 font-nizar-regular ${isArabic ? "rtl text-right" : "ltr text-left"}`}>
      <div className="bg-white shadow-lg w-[210mm] min-h-[297mm] p-10 rounded-md border border-gray-300 dark:bg-light-gray dark:text-black">
        <h1 className="text-3xl mb-10">Terms of Use</h1>
        {termsList.map((terms) => (
          <div key={terms._id} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-secondary-blue">
              {isArabic ? terms.title_ar : terms.title_en}
            </h2>
            <div className="font-normal text-base leading-relaxed">
            <PortableText value={isArabic ? terms.content_ar : terms.content_en} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsOfUse;
