import * as React from 'react'
import Head from 'next/head'

import { isCareEnv } from '~lib/config'
import { withOwner } from '~lib/pageWrappers'
import { Text, Box, Row, ButtonLink } from '~ui/core'
import { Circle, Check, ArrowsRight, ArrowsLeft } from '~ui/anicons'
import { MobileApp } from '~ui/layouts/MobileApp'
import { finishedText } from '~lib/contentBasedOnEnv'

function SetupSuccessPage() {
  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">Fertig | recover</title>
      </Head>
      <Text as="h2" variant="h2">
        Alles fertig!
      </Text>
      <Box height={10} />
      <Row justifyContent="center">
        <Circle animated delay={0.5} color="green">
          <Check delay={0.8} css={{ position: 'relative', top: 2 }} />
        </Circle>
      </Row>
      <Box height={10} />
      <Text>{finishedText}</Text>
      <Box height={6} />

      <ButtonLink
        href="/business/dashboard"
        right={<ArrowsLeft color="green" />}
        left={<ArrowsRight color="green" />}
      >
        Starten
      </ButtonLink>
    </MobileApp>
  )
}

export default withOwner()(SetupSuccessPage)
