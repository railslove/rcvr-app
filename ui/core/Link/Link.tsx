import React from 'react'
import { useRouter } from 'next/router'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

import localesConfig from '~locales/generated/config.json'

export type LinkHref = keyof typeof localesConfig

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
  const currentLocale = props.locale || router.locale
  const nextPageLocales = (localesConfig[props.href] || { locales: [] }).locales

  const locale = nextPageLocales.includes(currentLocale)
    ? currentLocale
    : router.defaultLocale

  return target ? (
    <NextLink {...props} />
  ) : (
    <NextLink {...props} locale={locale} />
  )
}

export default Link
