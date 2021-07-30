import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import de from './de'

export const resources = {
  de,
}

i18n.use(initReactI18next).init({
  ns: Object.keys(de),
  lng: 'de',

  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },

  resources,
})

export default i18n
