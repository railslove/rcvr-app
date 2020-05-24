import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { queryCache } from 'react-query'

import { MobileApp } from '@ui/layouts/MobileApp'
import { Text } from '@ui/core'
import { Loading } from '@ui/blocks/Loading'

export default function BusinessIndexPage() {
  const router = useRouter()
  React.useEffect(() => {
    localStorage.removeItem('rcvr_olt')
    queryCache.clear()
    router.replace('/business')
  }, [router])

  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">Logout... | recover</title>
      </Head>
      <Text as="h2" variant="h2">
        Logout...
      </Text>
      <Loading show />
    </MobileApp>
  )
}
