import * as React from 'react'
import Head from 'next/head'

import { isFormal } from '~lib/config'
import { Text, Box, Row, Button, ButtonLink, Card } from '~ui/core'
import { ArrowsRight } from '~ui/anicons'
import { KeyPaper } from '~ui/svg'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { MobileApp } from '~ui/layouts/MobileApp'
import { generateKeys } from '~lib/crypto'
import { updateOwner } from '~lib/actions'
import { useRouter } from 'next/router'
import { downloadKey } from '~lib/actions/downloadKey'
import { contactInformation, privateKeyExplanation } from '~ui/whitelabels'

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
      <Text as="h3" variant="h3">
        Account erstellen (2/3)
      </Text>
      <Box height={6} />
      <Row justifyContent="center">
        <KeyPaper />
      </Row>
      <Box height={4} />
      <Card variant="form" mx={-4}>
        <Text as="h2" variant="h2">
          2. Ihr privater Schlüssel
        </Text>
        <Box height={4} />
        <Text>{privateKeyExplanation}</Text>
        <Box height={6} />
        <Text>{contactInformation}</Text>
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
      </Card>
    </MobileApp>
  )
}

export default withOwner()(SetupSuccessPage)
