import { createContext, useContext } from 'react'
import { defaultLocale } from './config.defaults.json'
import placeholderLocale from '~pages/index.de'
import { PageLocaleResource } from '~locales/types'
import { SupportedLanguage } from '~locales/config.defaults'

export const LocalesContext = createContext<{
  lang: string
  values: PageLocaleResource
  availableLanguages: SupportedLanguage[]
}>({
  lang: defaultLocale,
  values: placeholderLocale,
  availableLanguages: [],
})

export const LocalesContextProvider = LocalesContext.Provider

const useLocaleContext = () => useContext(LocalesContext)

export default useLocaleContext
