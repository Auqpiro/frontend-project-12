import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import resources from '../locales/index.js';

const InternationalizationProvider = ({ children }) => {
  const i18n = i18next.createInstance();
  i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
    fallbackLng: ['ru', 'en', 'zh', 'es'],
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};

export default InternationalizationProvider;
