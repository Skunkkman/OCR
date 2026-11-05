import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Cookies from 'universal-cookie';

import enTranslations from '../OCR Frontend/src/locales/locales_en.js';
import ruTranslations from '../OCR Frontend/src/locales/locales_ru.js';

const cookies = new Cookies();

const resources = {
  en: { translation: enTranslations },
  ru: { translation: ruTranslations }
};

const getLanguageFromCookie = () => {
  const lang = cookies.get('language');
  return lang && resources[lang] ? lang : 'en';
};

i18n.use(initReactI18next).init({
  resources,
  lng: getLanguageFromCookie(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export const updateLanguageFromCookie = () => {
  const newLang = getLanguageFromCookie();
  if (newLang !== i18n.language) {
    i18n.changeLanguage(newLang);
  }
};

export default i18n;
