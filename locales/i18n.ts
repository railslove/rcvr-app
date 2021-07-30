import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import * as resources from './resources'
import { isCareEnv, isHealthEnv } from '~lib/config'

export const defaultLocaleOptions = {
  context: isCareEnv ? 'care' : isHealthEnv ? 'health' : undefined,
}

i18n.use(initReactI18next).init({
  ns: Object.keys(resources.de),
  lng: 'en',

  interpolation: {
    escapeValue: false, // react escapes by default
  },

  resources,
})

export default i18n
