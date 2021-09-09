/**
 * See: https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie
 */
export default function usePersistLocaleCookie() {
  return function persistLocale(locale: string) {
    const date = new Date()
    const expireMs = 100 * 24 * 60 * 60 * 1000 // 100 days
    date.setTime(date.getTime() + expireMs)
    document.cookie = `NEXT_LOCALE=${locale};expires=${date.toUTCString()};path=/`
  }
}
