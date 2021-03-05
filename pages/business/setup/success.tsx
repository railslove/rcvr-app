import Head from 'next/head'
import { useRouter } from 'next/router'
import * as React from 'react'
import { updateOwner } from '~lib/actions'
import { downloadKey } from '~lib/actions/downloadKey'
import { isFormal } from '~lib/config'
import { generateKeys } from '~lib/crypto'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { ArrowsRight } from '~ui/anicons'
import { Box, Button, ButtonLink, Card, Row, Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'
import { KeyPaper } from '~ui/svg'
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
          2.
          {isFormal ? ' Ihr privater Schlüssel.' : ' Dein privater Schlüssel.'}
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
