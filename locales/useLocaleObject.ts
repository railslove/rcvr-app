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
  const router = useRouter()
  const language = router.locale as SupportedLanguage
  const currentLocale = localeObject[language]

  type L = typeof currentLocale

  function t<K extends keyof L>(key: K, options: translateOptions = {}): L[K] {
    if (!options.useEnv) {
      return currentLocale ? currentLocale[key] : (`[${key}]` as L[K])
    }

    const envLocale = currentLocale[`${key}_${BUILD_VARIANT}`]

    return envLocale || currentLocale[key] || (`[${key}]` as L[K])
  }

  return { t, lang: language }
}

export default useLocaleObject
