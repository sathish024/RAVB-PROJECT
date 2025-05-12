import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import hi from "./locales/hi.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import tl from "./locales/tl.json";
import tu from "./locales/tu.json";
import ml from "./locales/ml.json";
import kd from "./locales/kd.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      tu: { translation: tu },
      ml: { translation: ml },
      kd: { translation: kd },
      tl: { translation: tl },
    },
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if the selected one is missing
    interpolation: {
      escapeValue: false, // React already protects against XSS
    },
  });

export default i18n;
