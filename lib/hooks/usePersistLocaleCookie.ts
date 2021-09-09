/**
 * See: https://github.com/vinissimus/next-translate#10-how-to-save-the-user-defined-language
 * NOTE: kept here in case we also wean to use local storage
 */
export default function usePersistLocaleCookie() {
  return function persistLocale(locale: string) {
    const date = new Date()
    const expireMs = 100 * 24 * 60 * 60 * 1000 // 100 days
    date.setTime(date.getTime() + expireMs)
    document.cookie = `NEXT_LOCALE=${locale};expires=${date.toUTCString()};path=/`
  }
}
