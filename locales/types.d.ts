import { PageLocalesResources } from '~locales/generated/types'

export type SupportedLanguage = 'en' | 'de'

export type LocalesConfigDefaults = {
  locales: SupportedLanguage[]
  defaultLocale: SupportedLanguage
}

export type PageLocaleResource =
  PageLocalesResources[keyof PageLocalesResources]
