import useLocaleContext from '~locales/useLocaleContext'
import { PageLocalesResources } from './generated/types'

const usePageLocale = <NS extends keyof PageLocalesResources>(ns: NS) => {
  type Result = PageLocalesResources[NS]

  const { lang, values } = useLocaleContext()
  const localeValues = values as Result

  function translate<NSK extends keyof Result>(key: NSK): Result[NSK] {
    return localeValues[key] || (`${ns}:${key}` as Result[NSK])
  }

  return { t: translate, lang }
}

export default usePageLocale
