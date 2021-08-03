import { useRouter } from 'next/router'
import pupa from 'pupa'

// const BUILD_ENV = isCareEnv ? 'care' : isHealthEnv ? 'health' : 'recover'
// const FORMAL_SUFFIX = 'formal'
// const BUILD_ENV_FORMAL = `${BUILD_ENV}_${FORMAL_SUFFIX}`

export type Language = 'de'

const useLocale = <NSValue>(data: { [key in Language]: NSValue }) => {
  const router = useRouter()
  const { locale } = router
  const lang = (locale || 'de').replace(/-[A-Z]+$/, '') as Language

  function translate<TKey extends keyof NSValue>(
    key: TKey,
    options?: Record<string, unknown>
  ) {
    const result = data[lang] != null ? data[lang][key] : data.de[key]

    if (typeof result === 'string' && options) {
      return pupa(result, options)
    }

    return result
  }

  return translate
}

export default useLocale
