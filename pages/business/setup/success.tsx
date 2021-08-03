import Head from 'next/head'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useQueryClient } from 'react-query'
import { updateOwner } from '~lib/actions'
import { generateKeys } from '~lib/crypto'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import useLocale from '~locales/useLocale'
import { ArrowsRight } from '~ui/anicons'
import { Box, Button, Card, Row, Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'
import { KeyPaper } from '~ui/svg'
import { contactInformation, privateKeyExplanation } from '~ui/whitelabels'

import locales from './success.locales'

const SetupSuccessPage: React.FC<WithOwnerProps> = ({ owner }) => {
  const t = useLocale(locales)
  const router = useRouter()
  const queryClient = useQueryClient()

  const generateKey = async (redirectTarget: string) => {
    if (!owner) return

    let { publicKey, privateKey } = owner
    if (!publicKey || !privateKey) {
      const keys = generateKeys()
      privateKey = keys.privateKey
      publicKey = keys.publicKey

      // the backend will receive the publicKey when the onboarding
      // process has been done completely.
      // meanwhile we store it in the frontend as setupPublicKey.
      // so when a user freshly logs in (or reloads or whatever)
      // and doesn't have a public_key assigned in the backend
      // the frontend needs to restart the onboarding process!
      await updateOwner(queryClient, {
        ...owner,
        privateKey,
        setupPublicKey: publicKey,
      })
    }
    router.push(redirectTarget)
  }

  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">{t('title')} | recover</title>
      </Head>
      <Text as="h3" variant="h3">
        {t('title')} (2/3)
      </Text>
      <Box height={6} />
      <Row justifyContent="center">
        <KeyPaper />
      </Row>
      <Box height={4} />
      <Card variant="form" mx={-4}>
        <Text as="h2" variant="h2">
          2.
          {t('headline')}
        </Text>
        <Box height={4} />
        <Text>{privateKeyExplanation}</Text>
        <Box height={6} />
        <Text>{contactInformation}</Text>
        <Box height={6} />
        <Button
          onClick={() => {
            generateKey('/business/setup/verify-key')
          }}
          right={<ArrowsRight color="green" />}
        >
          Schlüssel als Datei herunterladen
        </Button>
        <Box height={6} />
        <Button
          onClick={() => {
            generateKey('/business/setup/keys')
          }}
          right={<ArrowsRight color="green" />}
          css={{ textAlign: 'center' }}
        >
          Schlüssel drucken / notieren
        </Button>
      </Card>
    </MobileApp>
  )
}

export default withOwner()(SetupSuccessPage)
