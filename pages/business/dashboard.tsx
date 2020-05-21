import * as React from 'react'
import Head from 'next/head'

import { withOwner, WithOwnerProps } from '@lib/pageWrappers/withOwner'
import { MobileApp } from '@ui/layouts/MobileApp'
import { Text } from '@ui/core'

const DashboardPage: React.FC<WithOwnerProps> = ({ owner }) => {
  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">Dashboard | recover</title>
      </Head>
      <Text as="h2" variant="h2">
        Hallo, {owner.name}!
      </Text>
    </MobileApp>
  )
}

export default withOwner()(DashboardPage)
