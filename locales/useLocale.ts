import { useTranslation } from 'react-i18next'
import { LocaleLanguages, LocaleResources } from 'types/react-i18next'
import { isCareEnv, isHealthEnv } from '~lib/config'

const BUILD_ENV = isCareEnv ? 'care' : isHealthEnv ? 'health' : 'recover'
const FORMAL_SUFFIX = 'formal'
const BUILD_ENV_FORMAL = `${BUILD_ENV}_${FORMAL_SUFFIX}`

const useLocale = <NSKey extends keyof LocaleResources, NSValue>(
  ns: NSKey,
  data: { [key in LocaleLanguages]: NSValue }
) => {
  const { t, i18n } = useTranslation(ns)

  Object.keys(data).forEach((lang) => {
    if (!i18n.hasResourceBundle(lang, ns)) {
      i18n.addResources(lang, ns, data[lang])
    }
  })

  return t
}

export default useLocale
