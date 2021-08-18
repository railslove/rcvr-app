import config from '~locales/generated/config.json'
import { defaultLocale } from '~locales/config.defaults.json'

export type LoadLocaleProps = {
  locale?: string
  pathname: string
}

async function loadLocale({ locale, pathname }: LoadLocaleProps) {
  if (config.pages[pathname]) {
    const path = pathname as keyof typeof config.pages

    const { locales, namespace } = config.pages[path]

    const lang = locales.includes(locale)
      ? locale
      : locales.includes(defaultLocale)
      ? defaultLocale
      : locales[0]

    console.info('[info:locale] lang "%s" for path "%s"', lang, pathname)

    const values = await import(`../pages/${namespace}.${lang}.ts`).then(
      (m) => m.default
    )
    return { values, lang, availableLanguages: locales }
  } else {
    console.info('[info:locale] locale not found for', pathname)
    return {}
  }
}

export default loadLocale
