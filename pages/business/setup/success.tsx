import * as React from 'react'
import Head from 'next/head'

import { Text, Box, Row, ButtonLink } from '~ui/core'
import { ArrowsRight } from '~ui/anicons'
import { Step3 } from '~ui/svg'
import { withOwner } from '~lib/pageWrappers'
import { MobileApp } from '~ui/layouts/MobileApp'

function SetupSuccessPage() {
  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">Account erstellt | recover</title>
      </Head>
      <Text as="h2" variant="h2">
        Toll, dass Sie dabei sind!
      </Text>
      <Box height={6} />
      <Row justifyContent="center">
        <Step3 />
      </Row>
      <Box height={6} />
      <Text>
        <p>
          Wir freuen uns, dass Sie recover nutzten!{' '}
          <span role="img" aria-label="Hurra!">
            🎉
          </span>{' '}
          Sie können nun mit der Einrichtung fortsetzen.
        </p>
        <p>
          Um die Echtheit Ihrer Daten mit Ihnen zu überprüfen, werden wir uns
          bald per Email bei Ihnen melden.
        </p>
        <p>
          <strong>Im nächsten Schritt</strong> kümmern wir uns um die
          Verschlüsselung Ihrer Kundendaten.
        </p>
        <p>
          Dafür sehen Sie gleich einen <strong>privaten Schlüssel</strong>. Das
          passiert komplett auf deinem Handy, wir können diesen Schlüssel nicht
          sehen.
        </p>
        <p>
          Mit diesem Schlüssel können Sie bei einer Anfrage durch das
          Gesundheitsamt die Kontaktdaten Ihrer Gäste entschlüsseln.
        </p>
        <p>
          <strong>
            Den Schlüssel müssen Sie Ihnen aufschreiben und gut bewahren. Er darf
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
