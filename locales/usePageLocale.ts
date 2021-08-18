import { useRouter } from 'next/router'
import { createContext, useContext } from 'react'
import { PageLocalesResources } from './generated/types'

import placeholderLocale from '~pages/index.de'

export const LocalesContext =
  createContext<PageLocaleResource>(placeholderLocale)

export const LocalesContextProvider = LocalesContext.Provider

export type PageLocaleResource =
  PageLocalesResources[keyof PageLocalesResources]

const usePageLocale = <NS extends keyof PageLocalesResources>() => {
  type Result = PageLocalesResources[NS]

  const { locale: lang } = useRouter()
  const localeContext = useContext(LocalesContext) as Result

  function translate<NSK extends keyof Result>(key: NSK) {
    return localeContext[key]
  }

  return { t: translate, lang }
}

export default usePageLocale
