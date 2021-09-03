import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 * See: https://github.com/vinissimus/next-translate#10-how-to-save-the-user-defined-language
 */
export default function usePersistLocaleCookie() {
  const { locale, defaultLocale } = useRouter()

  useEffect(
    function persistLocaleCookie() {
      if (locale !== defaultLocale) {
        const date = new Date()
        const expireMs = 100 * 24 * 60 * 60 * 1000 // 100 days
        date.setTime(date.getTime() + expireMs)
        document.cookie = `NEXT_LOCALE=${locale};expires=${date.toUTCString()};path=/`
      }
    },
    [locale, defaultLocale]
  )
}
