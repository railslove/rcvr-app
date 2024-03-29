import { AppContext } from 'next/app'

import config from '~locales/generated/config.json'
import { SupportedLanguage } from '~locales/types'
import { LocaleContextProps } from '~locales/useLocaleContext'

async function loadPageLocale(
  props: AppContext
): Promise<Partial<LocaleContextProps>> {
  const locale = props.router.locale
  const { pathname } = props.ctx

  if (config[pathname]) {
    const path = pathname as keyof typeof config

    const { locales, namespace } = config[path]

    const lang = (
      locales.includes(locale)
        ? locale
        : locales.includes(props.router.defaultLocale)
        ? props.router.defaultLocale
        : locales[0]
    ) as SupportedLanguage

    if (process.env.NODE_ENV !== 'production') {
      console.info('[locale] loading lang "%s" for "%s"', lang, pathname)
    }

    const values = await import(`../pages/${namespace}.${lang}.ts`).then(
      (m) => m.default
    )
    return { values, lang, pageLocales: locales }
  } else {
    console.info('[locale] "%s" not found for "%s"', locale, pathname)
    return {}
  }
}

export default loadPageLocale
