import * as React from 'react'
import Head from 'next/head'

import { isCareEnv } from '~lib/config'
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
        {isCareEnv
          ? 'Schön, dass Sie dabei sind!'
          : 'Toll, dass du dabei bist!'}
      </Text>
      <Box height={6} />
      <Row justifyContent="center">
        <Step3 />
      </Row>
      <Box height={6} />
      <Text>
        <p>
          {isCareEnv
            ? 'Wir freuen uns, dass Sie recover nutzen! '
            : 'Wir freuen uns, dass du recover nutzt! '}
          <span role="img" aria-label="Hurra!">
            🎉
          </span>{' '}
          {isCareEnv
            ? 'Sie können nun mit der Einrichtung der App fortsetzen.'
            : 'Du kannst nun mit der Einrichtung fortsetzen.'}
        </p>
        <p>
          {isCareEnv
            ? 'Um die Echtheit Ihrer Daten mit Ihnen zu überprüfen, werden wir uns bald per Email bei Ihnen melden.'
            : 'Um die Echtheit deiner Daten mit Dir zu überprüfen, werden wir uns bald per Email bei dir melden.'}
        </p>
        <p>
          <strong>Im nächsten Schritt</strong> kümmern wir uns um die
          Verschlüsselung der Kundendaten.
        </p>
        <p>
          Dafür {isCareEnv ? 'sehen Sie' : 'siehst Du'} gleich einen{' '}
          <strong>privaten Schlüssel</strong>. Das passiert komplett auf{' '}
          {isCareEnv ? 'Ihrem' : 'deinem'} Handy, wir können diesen Schlüssel
          nicht sehen.
        </p>
        <p>
          {isCareEnv
            ? 'Mit diesem Schlüssel können Sie bei einer Anfrage durch das Gesundheitsamt die Kontaktdaten Ihrer Gäste entschlüsseln.'
            : 'Mit diesem Schlüssel kannst du bei einer Anfrage durch das Gesundheitsamt die Kontaktdaten deiner Gäste entschlüsseln.'}
        </p>
        <p>
          <strong>
            {isCareEnv
              ? 'Den Schlüssel müssen Sie sich aufschreiben und gut bewahren. Er darf nicht verloren gehen.'
              : 'Den Schlüssel musst du dir aufschreiben und gut bewahren. Er darf nicht verloren gehen.'}
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
