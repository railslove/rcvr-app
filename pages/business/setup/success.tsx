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
import { privateKeyExplanation } from '~ui/whitelabels'

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
      <Text>{privateKeyExplanation}</Text>
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
