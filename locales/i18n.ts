import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { isCareEnv, isHealthEnv } from '~lib/config'

import de from './de'
import en from './en'

export const resources = {
  de,
  en,
}

export const defaultLocaleOptions = {
  context: isCareEnv ? 'care' : isHealthEnv ? 'health' : undefined,
}

i18n.use(initReactI18next).init({
  ns: Object.keys(en),
  lng: 'en',

  interpolation: {
    escapeValue: false, // react escapes by default
  },

  resources,
})

export default i18n
