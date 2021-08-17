import { TranslationQuery } from 'next-translate'
import useTranslation from 'next-translate/useTranslation'
import { PageLocalesResources } from './generated/types'

export type TranslationOptions = Parameters<
  ReturnType<typeof useTranslation>['t']
>[2]

const useLocale = <NS extends keyof PageLocalesResources>(ns: NS) => {
  type Result = PageLocalesResources[NS]

  const { t, lang } = useTranslation(ns)

  function translate<NSK extends keyof Result>(
    key: NSK,
    options?: TranslationOptions,
    query?: TranslationQuery
  ) {
    return t(key as string, query, options)
  }

  return { t: translate, lang }
}

export default useLocale
