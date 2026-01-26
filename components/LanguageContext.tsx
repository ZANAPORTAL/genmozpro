
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, translations, detectLocale } from '../i18n';

// Master schema based on the English keys
type TranslationSchema = typeof translations.en;

interface LanguageContextType {
  locale: Locale;
  t: TranslationSchema;
  setLocale: (l: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always default to English for a global professional feel
  const [locale, setLocale] = useState<Locale>('en');

  // Detect locale only on first load if desired, but prioritize English
  useEffect(() => {
    const detected = detectLocale();
    if (detected !== 'en') {
        // Option to auto-switch or keep English. Keeping English as per request.
    }
  }, []);

  // Explicitly cast the selected translation to TranslationSchema. 
  // This resolves the TS error where the union of all translations might not be strictly assignable to the English schema if keys differ.
  const t = translations[locale] as TranslationSchema;

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useTranslation must be used within LanguageProvider");
  return context;
};
