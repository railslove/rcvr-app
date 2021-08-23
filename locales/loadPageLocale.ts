import config from '~locales/generated/pages.json'
import localesDefaults from '~locales/config.defaults.json'

export type LoadLocaleProps = {
  locale?: string
  pathname: string
}

async function loadPageLocale({ locale, pathname }: LoadLocaleProps) {
  if (config[pathname]) {
    const path = pathname as keyof typeof config

    const { locales, namespace } = config[path]

    const lang = locales.includes(locale)
      ? locale
      : locales.includes(localesDefaults.defaultLocale)
      ? localesDefaults.defaultLocale
      : locales[0]

    console.info('[info:locale] lang "%s" for path "%s"', lang, pathname)

    const values = await import(`../pages/${namespace}.${lang}.ts`).then(
      (m) => m.default
    )
    return { values, lang, pageLocales: locales }
  } else {
    console.info('[info:locale] locale not found for', pathname)
    return {}
  }
}

export default loadPageLocale
