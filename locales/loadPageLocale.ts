import config from '~locales/generated/config.json'

export type LoadLocaleProps = {
  locale?: string
  pathname: string
}

async function loadPageLocale(props: LoadLocaleProps) {
  console.log('process.env.NODE_ENV', process.env.NODE_ENV)

  const locale = process.env.NODE_ENV === 'test' ? 'de' : props.locale
  const { pathname } = props

  if (config[pathname]) {
    const path = pathname as keyof typeof config

    const { locales, namespace } = config[path]

    const lang = locales.includes(locale)
      ? locale
      : locales.includes('en')
      ? 'en'
      : locales[0]

    console.info(
      '[info:locale] loading lang "%s" for path "%s"',
      lang,
      pathname
    )

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
