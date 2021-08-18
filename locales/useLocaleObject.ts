import { useRouter } from 'next/router'
import { SupportedLanguage } from '~locales/config.defaults'

export type LocaleObject<K extends string, V extends unknown> = {
  [lang in SupportedLanguage]: {
    [key in K]: V
  }
}

const useLocaleObject = <K extends string, V extends unknown>(
  localeObject: LocaleObject<K, V>
) => {
  const router = useRouter()
  const language = router.locale as SupportedLanguage
  const currentLocale = localeObject[language]

  type L = typeof currentLocale

  function t<K extends keyof L>(key: K): L[K] {
    return currentLocale[key]
  }

  return { t, lang: language }
}

export default useLocaleObject
