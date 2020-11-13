import * as React from 'react'
import Head from 'next/head'

import { isFormal } from '~lib/config'
import { Text, Box, Row, Button, ButtonLink } from '~ui/core'
import { ArrowsRight } from '~ui/anicons'
import { Step3 } from '~ui/svg'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { MobileApp } from '~ui/layouts/MobileApp'
import { generateKeys } from '~lib/crypto'
import { updateOwner } from '~lib/actions'
import { useRouter } from 'next/router'
import { downloadKey } from '~lib/actions/downloadKey'

const SetupSuccessPage: React.FC<WithOwnerProps> = ({ owner }) => {
  const router = useRouter()
  const generateKey = async () => {
    if (!owner) return

    let { publicKey, privateKey } = owner

    if (!publicKey || !privateKey) {
      const keys = generateKeys()
      privateKey = keys.privateKey
      publicKey = keys.publicKey
      await updateOwner({ ...owner, privateKey, publicKey })
    }
    downloadKey(privateKey)
    router.push('/business/setup/verify-key')
  }

  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">Account erstellt | recover</title>
      </Head>
      <Text as="h2" variant="h2">
        {isFormal ? 'Schön, dass Sie dabei sind!' : 'Toll, dass du dabei bist!'}
      </Text>
      <Box height={6} />
      <Row justifyContent="center">
        <Step3 />
      </Row>
      <Box height={6} />
      <Text>
        <p>
          {isFormal
            ? 'Wir freuen uns, dass Sie recover nutzen! '
            : 'Wir freuen uns, dass du recover nutzt! '}
          <span role="img" aria-label="Hurra!">
            🎉
          </span>
        </p>
        <p>
          {isFormal
            ? 'Um die Echtheit Ihrer Daten zu überprüfen, werden wir uns bald per Email melden.'
            : 'Um die Echtheit deiner Daten mit Dir zu überprüfen, werden wir uns bald per Email bei dir melden.'}
        </p>
        <p>
          <strong>Nächster Schritt: </strong>
          <br />
          Bitte drücken sie auf "Schlüssel herunterladen". Das erzeugt eine
          Schlüsseldatei und startet den Download.
        </p>
        <p>
          <strong>Bitte speichern sie die Datei auf ihrem Rechner ab.</strong>
        </p>
        <p>
          <strong>
            Ohne die Schlüsseldatei können sie keine Daten an das Gesundheitsamt
            senden.
          </strong>
        </p>
      </Text>
      <Box height={6} />
      <Button onClick={generateKey} right={<ArrowsRight color="green" />}>
        Schlüssel herunterladen
      </Button>
      <Box height={6} />
      <ButtonLink
        href="/business/setup/keys"
        right={<ArrowsRight color="green" />}
        css={{ textAlign: 'center' }}
      >
        Schlüssel drucken / notieren
      </ButtonLink>
    </MobileApp>
  )
}

export default withOwner()(SetupSuccessPage)
