import Head from 'next/head'
import React from 'react'
import useLocaleObject from '~locales/useLocaleObject'
import pageTitleLocales from '~ui/blocks/Title/pageTitleLocales'

type PageTitleProps = {
  content?: string
  children?: string
}

const PageTitle: React.FC<PageTitleProps> = (props) => {
  const { children } = props
  const { t } = useLocaleObject(pageTitleLocales)

  const content = [
    children ? children : t('for', { useEnv: true }),
    t('recover', { useEnv: children != null }),
  ].join(' | ')

  return (
    <Head>
      <title>{content}</title>
    </Head>
  )
}

export default PageTitle
