import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ar');

  useEffect(() => {
    const html = document.documentElement;
    if (lang === 'ar') {
      html.setAttribute('lang', 'ar');
      html.setAttribute('dir', 'rtl');
      document.body.classList.remove('lang-en');
      document.body.classList.add('lang-ar');
    } else {
      html.setAttribute('lang', 'en');
      html.setAttribute('dir', 'ltr');
      document.body.classList.remove('lang-ar');
      document.body.classList.add('lang-en');
    }
  }, [lang]);

  const toggle = () => setLang(prev => (prev === 'ar' ? 'en' : 'ar'));

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
