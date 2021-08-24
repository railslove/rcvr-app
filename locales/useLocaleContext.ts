import { createContext, useContext } from 'react'

import localesConfig from '~locales/defaults.json'
import placeholderLocale from '~pages/index.de'
import { PageLocaleResource, SupportedLanguage } from '~locales/types'

export type LocaleContextProps = {
  lang: SupportedLanguage
  values: PageLocaleResource
  pageLocales: string[]
}

export const LocalesContext = createContext<LocaleContextProps>({
  lang: localesConfig.defaultLocale as SupportedLanguage,
  values: placeholderLocale,
  pageLocales: [],
})

export const LocalesContextProvider = LocalesContext.Provider

const useLocaleContext = () => useContext(LocalesContext)

export default useLocaleContext
