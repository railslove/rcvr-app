import { createContext, useContext } from 'react'
import localesConfig from './config.defaults.json'
import placeholderLocale from '~pages/index.de'
import { PageLocaleResource } from '~locales/types'
import { SupportedLanguage } from '~locales/config.defaults'

export const LocalesContext = createContext<{
  lang: string
  values: PageLocaleResource
  pageLocales: SupportedLanguage[]
}>({
  lang: localesConfig.defaultLocale,
  values: placeholderLocale,
  pageLocales: [],
})

export const LocalesContextProvider = LocalesContext.Provider

const useLocaleContext = () => useContext(LocalesContext)

export default useLocaleContext
