export type SupportedLanguage = 'en' | 'de' | 'pl'

type LocalesConfigDefaults = {
  locales: SupportedLanguage[]
  defaultLocale: SupportedLanguage
}

export default LocalesConfigDefaults
