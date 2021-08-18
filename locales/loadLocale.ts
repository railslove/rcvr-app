import config from '~locales/generated/config.json'

export type LoadLocaleProps = {
  locale?: string
  pathname: string
}

async function loadLocale({ locale, pathname }: LoadLocaleProps) {
  if (config.pages[pathname]) {
    const path = pathname as keyof typeof config.pages

    const [namespace] = config.pages[path]
    return import(`../pages/${namespace}.${locale}.ts`).then((m) => m.default)
  } else {
    return {}
  }
}

export default loadLocale
