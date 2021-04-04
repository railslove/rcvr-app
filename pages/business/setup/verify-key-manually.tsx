import * as React from 'react'
import Head from 'next/head'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'

import { isFormal } from '~lib/config'
import { base64ToHex } from '~lib/crypto'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { Text, Box, Button, ButtonLink, Row, Input } from '~ui/core'
import { ArrowsRight, ArrowsLeft } from '~ui/anicons'
import { KeyPaper } from '~ui/svg'
import { MobileApp } from '~ui/layouts/MobileApp'
import { commitSetupPublicKey } from '~lib/actions'

const VerifyKeyPage: React.FC<WithOwnerProps> = ({ owner }) => {
  const router = useRouter()

  const handleCheck = React.useCallback(
    async ({ privateKey }, bag) => {
      const normalizedKey = privateKey.toUpperCase().replace(/\s/g, '')
      if (normalizedKey !== base64ToHex(owner.privateKey)) {
        bag.setFieldError(
          'privateKey',
          'Der Schlüssel stimmt nicht. Bitte nochmal überprüfen. Leerzeichen und Groß- und Kleinschreibung spielen keine Rolle.'
        )
      } else {
        await commitSetupPublicKey(owner)
        router
          .replace('/business/setup/finished')
          .then(() => window.scrollTo(0, 0))
      }
    },
    [router, owner.privateKey]
  )

  return (
    <MobileApp>
      <Head>
        <title key="title">
          {isFormal ? 'Ihr' : 'Dein'} Schlüssel | recover
        </title>
      </Head>
      <Text as="h2" variant="h2">
        Schlüssel bestätigen
      </Text>
      <Box height={6} />
      <Row justifyContent="center">
        <KeyPaper />
      </Row>
      <Box height={6} />
      <Text>
        {isFormal
          ? 'Geben Sie den Schlüssel nun erneut ein. Damit gehen wir sicher, dass Sie ihn korrekt notiert haben.'
          : 'Gib den Schlüssel nun erneut ein. Damit gehen wir sicher, dass Du ihn korrekt notiert hast.'}
      </Text>
      <Box height={4} />
      <Text>
        Zur Erinnerung: {isFormal ? 'Ihr' : 'Dein'} Schlüssel ist{' '}
        <strong>{base64ToHex(owner.publicKey).length} Zeichen</strong> lang. Er
        beinhaltet nur Zahlen von <strong>0 bis 9</strong> und Buchstaben von
        <strong> A bis F</strong>.
      </Text>
      <Box height={6} />

      <Formik initialValues={{ privateKey: '' }} onSubmit={handleCheck}>
        <Form>
          <Input name="privateKey" label="Schlüssel" multiline />
          <Box height={6} />
          <Button
            right={<ArrowsRight color="green" />}
            type="submit"
            css={{ width: '100%' }}
          >
            Schlüssel prüfen
          </Button>
        </Form>
      </Formik>
      <Box height={8} />
      <Text>
        {isFormal ? 'Sie können' : 'Du kannst'} auch nochmal zurück gehen und
        den Schlüssel erneut sehen.
      </Text>
      <Box height={4} />
      <ButtonLink
        href="/business/setup/keys"
        left={<ArrowsLeft color="bluegrey.300" />}
      >
        zurück
      </ButtonLink>
    </MobileApp>
  )
}

export default withOwner()(VerifyKeyPage)
