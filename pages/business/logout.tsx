import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'

import { Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'
import { Loading } from '~ui/blocks/Loading'
import { ta } from 'date-fns/locale'
import useLocale from '~locales/useLocale'

import de from './logout.de'

export default function BusinessIndexPage() {
  const t = useLocale('businessLogout', { de })

  const router = useRouter()
  const queryClient = useQueryClient()
  React.useEffect(() => {
    localStorage.removeItem('rcvr_olt')
    queryClient.clear()
    router.replace('/business')
  }, [router])

  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">{t('pageTitle')} | recover</title>
      </Head>
      <Text as="h2" variant="h2">
        {t('title')}
      </Text>
      <Loading show />
    </MobileApp>
  )
}
