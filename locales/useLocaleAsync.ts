import { TranslationQuery } from 'next-translate'
import getT from 'next-translate/getT'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { AsyncLocalesResources } from './generated/types'

export type TranslationOptions = Parameters<
  ReturnType<typeof useTranslation>['t']
>[2]

const useLocaleAsync = <NS extends keyof AsyncLocalesResources>(ns: NS) => {
  type Result = AsyncLocalesResources[NS]

  const { locale: lang } = useRouter()
  const { isLoading, data: t } = useQuery(ns, () => getT(lang, ns))

  function translate<NSK extends keyof Result>(
    key: NSK,
    options?: TranslationOptions,
    query?: TranslationQuery
  ) {
    return t(key as string, query, options)
  }

  return { lang, isLoading, t: translate }
}

export default useLocaleAsync
