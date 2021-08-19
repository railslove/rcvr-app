import useLocaleContext from '~locales/useLocaleContext'
import { PageLocalesResources } from './generated/types'

const usePageLocale = <NS extends keyof PageLocalesResources>() => {
  type Result = PageLocalesResources[NS]

  const { values, lang } = useLocaleContext()
  const localeValues = values as Result

  function translate<NSK extends keyof Result>(key: NSK): Result[NSK] {
    return localeValues[key]
  }

  return { t: translate, lang }
}

export default usePageLocale
