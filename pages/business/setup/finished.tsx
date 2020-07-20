import * as React from 'react'
import Head from 'next/head'

import { isCareEnv } from '~lib/config'
import { withOwner } from '~lib/pageWrappers'
import { Text, Box, Row, ButtonLink } from '~ui/core'
import { Circle, Check, ArrowsRight, ArrowsLeft } from '~ui/anicons'
import { MobileApp } from '~ui/layouts/MobileApp'

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
      <Text>
        <p>
          {isCareEnv
            ? 'Wir freuen uns, dass Sie dabei sind! Ihr Account ist jetzt vollständig eingerichtet.'
            : 'Wir freuen uns, dass Du dabei bist! Dein Account ist jetzt vollständig eingerichtet.'}
        </p>
        <p>
          {isCareEnv
            ? 'Sie können sich gern bei uns melden um gemeinsam Ihre Daten zu prüfen'
            : 'Du kannst dich gern bei uns melden um gemeinsam deine Daten zu prüfen'}
        </p>
        <p>
          {isCareEnv
            ? 'Jetzt können Sie schon Betriebe, Häuser und Bereiche sowie QR Codes erstellen.'
            : 'Jetzt kannst du schon Betriebe, Tische und QR Codes erstellen.'}
        </p>
      </Text>
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
