import * as React from 'react'
import Head from 'next/head'

import { withOwner } from '@lib/pageWrappers/withOwner'
import { MobileApp } from '@ui/layouts/MobileApp'
import { Text, Box, Row, ButtonLink } from '@ui/core'
import { ArrowsRight } from '@ui/anicons/Arrows'
import Step3 from '@ui/svg/step-3.svg'

function SetupSuccessPage() {
  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">Account erstellt | recover</title>
      </Head>
      <Text as="h2" variant="h2">
        Toll, dass du dabei bist!
      </Text>
      <Box height={6} />
      <Row justifyContent="center">
        <Step3 />
      </Row>
      <Box height={6} />
      <Text>
        <p>
          Wir freuen uns, dass du recover nutzt!{' '}
          <span role="img" aria-label="Hurra!">
            🎉
          </span>{' '}
          Du kannst nun mit der Einrichtung fortsetzen.
        </p>
        <p>
          Um die Echtheit deiner Daten mit Dir zu überprüfen, werden wir uns
          bald per Email bei dir melden.
        </p>
        <p>
          <strong>Im nächsten Schritt</strong> kümmern wir uns um die
          Verschlüsselung deiner Kundendaten.
        </p>
        <p>
          Dafür siehst du gleich einen <strong>privaten Schlüssel</strong>. Das
          passiert komplett auf deinem Handy, wir können diesen Schlüssel nicht
          sehen.
        </p>
        <p>
          Mit diesem Schlüssel kannst du bei einer Anfrage durch das
          Gesundheitsamt die Kontaktdaten deiner Gäste entschlüsseln.
        </p>
        <p>
          <strong>
            Den Schlüssel musst du dir aufschreiben und gut bewahren. Er darf
            nicht verloren gehen.
          </strong>
        </p>
      </Text>
      <Box height={6} />

      <ButtonLink
        href="/business/setup/keys"
        right={<ArrowsRight color="green" />}
      >
        Schlüssel erstellen
      </ButtonLink>
    </MobileApp>
  )
}

export default withOwner()(SetupSuccessPage)
