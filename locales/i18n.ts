import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  lng: 'en',

  interpolation: {
    escapeValue: false, // react escapes by default
  },
})

export default i18n
