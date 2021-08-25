import * as React from 'react'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'

import { Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'
import { Loading } from '~ui/blocks/Loading'
import usePageLocale from '~locales/usePageLocale'

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
    <MobileApp pageTitle={t('title')} logoVariant="big">
      <Text as="h2" variant="h2">
        {t('title')}
      </Text>
      <Loading show />
    </MobileApp>
  )
}
