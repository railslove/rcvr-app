import * as React from 'react'
import Head from 'next/head'
import * as Yup from 'yup'
import Link from 'next/link'
import { Formik, Form } from 'formik'

import { isCareEnv } from '~lib/config'
import { Row, Callout, Text, Card, Box, Button, Input } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'
import { Loading } from '~ui/blocks/Loading'
import { postRequestPasswordReset } from '~lib/api'

const EmailSchema = Yup.object().shape({
  email: Yup.string().required('Email muss angegeben werden.'),
})

export default function PasswordResetRequestPage() {
  const [loading, setLoading] = React.useState(false)
  const [done, setDone] = React.useState(false)

  const handleSubmit = async ({ email }) => {
    setLoading(true)

    await postRequestPasswordReset(email)

    setDone(true)
    setLoading(false)
  }

  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">Passwort Vergessen | recover</title>
      </Head>
      <Text as="h2" variant="h2">
        Passwort Vergessen
      </Text>
      <Box height={4} />
      <Text>
        <p>
          Bitte {isCareEnv ? 'geben Sie Ihre' : 'gib deine'} Email Adresse ein.
          Wir schicken dann einen Link um das Passwort zurückzusetzen an die
          angegebene Email Adresse.
        </p>
      </Text>
      <Box height={4} />

      {!done && (
        <Formik
          initialValues={{ email: '' }}
          validationSchema={EmailSchema}
          onSubmit={handleSubmit}
        >
          <Card variant="form" mx={-4}>
            <Loading show={loading} />
            <Form>
              <Input name="email" label="Email" autoComplete="email" />
              <Box height={5} />
              <Button type="submit" css={{ width: '100%' }}>
                Passwort Zurücksetzen
              </Button>
            </Form>
          </Card>
        </Formik>
      )}
      {done && (
        <Callout>
          <Text>
            Falls {isCareEnv ? 'Ihre' : 'deine'} Email Adresse bei uns
            registriert war haben wir {isCareEnv ? 'Ihnen' : 'dir'} einen Link
            zum Passwort zurückzusetzen geschickt. Bitte{' '}
            {isCareEnv ? 'überprüfen Sie Ihr' : 'überprüfe dein'} Email Konto.
            Sollte das nicht funktioniert haben,
            {isCareEnv ? 'wenden Sie' : 'wende dich'} bitte an useren{' '}
            <a href="mailto:team@recoverapp.de">support</a>.
          </Text>
        </Callout>
      )}

      <Row justifyContent="center" my={6}>
        <Link href="/business/login" as="a" passHref>
          <Text variant="link">Zum login</Text>
        </Link>
      </Row>
    </MobileApp>
  )
}
