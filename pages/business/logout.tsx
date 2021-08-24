import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'

import { Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'
import { Loading } from '~ui/blocks/Loading'
import usePageLocale from '~locales/usePageLocale'
import PageTitle from '~ui/blocks/Title/PageTitle'

export default function BusinessIndexPage() {
  const { t } = usePageLocale('business/logout')

  const router = useRouter()
  const queryClient = useQueryClient()
  React.useEffect(() => {
    localStorage.removeItem('rcvr_olt')
    queryClient.clear()
    router.replace('/business')
  }, [router, queryClient])

  return (
    <MobileApp logoVariant="big">
      <Head>
        <PageTitle>{t('title')}</PageTitle>
      </Head>
      <Text as="h2" variant="h2">
        {t('title')}
      </Text>
      <Loading show />
    </MobileApp>
  )
}
