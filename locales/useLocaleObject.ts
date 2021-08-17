import { useRouter } from 'next/router'
import { SupportedLanguage } from '~locales/config.defaults'

export type LocaleObject<K extends string, V extends unknown> = {
  [key in K]: {
    [lang in SupportedLanguage]: V
  }
}

const useLocaleObject = <K extends string, V extends unknown>(
  localeObject: LocaleObject<K, V>
) => {
  type Locale = typeof localeObject

  const router = useRouter()
  const language = router.locale as SupportedLanguage

  function t<LocaleKey extends keyof Locale>(key: LocaleKey) {
    const value = localeObject[language][key]
    return value[key]
  }

  return { t, lang: language }
}

export default useLocaleObject
