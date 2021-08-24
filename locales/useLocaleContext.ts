import { createContext, useContext } from 'react'

import localesConfig from '~locales/defaults.json'
import placeholderLocale from '~pages/index.de'
import { PageLocaleResource, SupportedLanguage } from '~locales/types'

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
