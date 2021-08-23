import React from 'react'
import { useRouter } from 'next/router'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

import pageLocalesConfig from '~locales/generated/pages.json'
import { SupportedLanguage } from '~locales/types'

export type LinkHref = keyof typeof pageLocalesConfig

export type LinkProps = NextLinkProps &
  (
    | {
        href: LinkHref
        target?: never
      }
    | {
        href: string
        target: string
      }
  )

const Link: React.FC<LinkProps> = ({ target, ...props }) => {
  const router = useRouter()
  const currentLocale = (props.locale || router.locale) as SupportedLanguage
  const nextPageLocales = (pageLocalesConfig[props.href] || { locales: [] })
    .locales

  const locale = nextPageLocales.includes(currentLocale)
    ? currentLocale
    : nextPageLocales[0] || router.defaultLocale

  return target ? (
    <NextLink {...props} />
  ) : (
    <NextLink {...props} locale={locale} />
  )
}

export default Link
