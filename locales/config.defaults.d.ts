export type SupportedLanguage = 'en' | 'de'

type LocalesConfigDefaults = {
  locales: SupportedLanguage[]
  defaultLocale: SupportedLanguage
}

export default LocalesConfigDefaults
