import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import English from '../Languages/English.json';
import Arabic from '../Languages/Arabic.json';

const resources = {
  en: English,
  ar: Arabic,
};

i18n.use(initReactI18next).init({
  lng: I18nManager.isRTL ? 'ar' : 'en',

  resources: resources,

  react: {
    useSuspense: false,
  },

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
