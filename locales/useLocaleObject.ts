import { useRouter } from 'next/router'
import { SupportedLanguage } from '~locales/types'
import { BUILD_VARIANT } from '~ui/whitelabels'

export type LocaleObject<K extends string, V extends unknown> = {
  [lang in SupportedLanguage]: {
    [key in K]: V
  }
}

export type translateOptions = Partial<{
  /**
   * use isCareEnv, isHealthEnv, isFreseniusEnv, etc.
   * to pick keys like for_care, for_health, for (without _ is the default)
   * @default undefined
   */
  useEnv: boolean
}>

const useLocaleObject = <K extends string, V extends unknown>(
  localeObject: LocaleObject<K, V>
) => {
  type Result = LocaleObject<K, V>[SupportedLanguage]

  const router = useRouter()
  const language = router.locale as SupportedLanguage
  const currentLocale = (localeObject[language] || {}) as Result

  function t<K extends keyof Result>(
    key: K,
    options: translateOptions = {}
  ): Result[K] {
    const placeholder = `[${key}]` as Result[K]

    const value = currentLocale[key]
    const valueEnv = currentLocale[`${key}_${BUILD_VARIANT}`]
    const localeResult = options.useEnv && valueEnv != null ? valueEnv : value

    if (localeResult == null) {
      return placeholder
    }

    return localeResult
  }

  return { t, lang: language }
}

export default useLocaleObject
