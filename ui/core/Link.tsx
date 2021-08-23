import React from 'react'
import { useRouter } from 'next/router'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

import useLocaleContext from '~locales/useLocaleContext'
import pageLocalesConfig from '~locales/generated/pages.json'
import { SupportedLanguage } from '~locales/config.defaults'

export type LinkHref = keyof typeof pageLocalesConfig

export type LinkProps = NextLinkProps & {
  href: LinkHref
  externalHref?: string
}

const Link: React.FC<LinkProps> = ({ externalHref, ...props }) => {
  const { pageLocales, lang } = useLocaleContext()

  const router = useRouter()
  const currentLocale = (props.locale || router.locale) as SupportedLanguage
  const nextPageLocales = (pageLocalesConfig[props.href] || { locales: [] })
    .locales

  const locale = nextPageLocales.includes(currentLocale)
    ? currentLocale
    : nextPageLocales[0] || router.defaultLocale

  return externalHref ? (
    <NextLink {...props} />
  ) : (
    <NextLink {...props} locale={locale} />
  )
}

export default Link
