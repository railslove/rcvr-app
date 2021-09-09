import useLocaleContext from '~locales/useLocaleContext'
import { PageLocalesResources } from './generated/types'

export type t<LO extends Record<string, unknown>> = (
  key: keyof LO
) => LO[typeof key]

const usePageLocale = <NS extends keyof PageLocalesResources>(_ns: NS) => {
  type Result = PageLocalesResources[NS]

  const { lang, values } = useLocaleContext()
  const localeValues = values as Result

  function translate<NSK extends keyof Result>(key: NSK): Result[NSK] {
    return localeValues[key] || (`[${key}]` as unknown as Result[NSK])
  }

  return { t: translate, lang }
}

export default usePageLocale
