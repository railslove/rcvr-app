import { Form, Formik } from 'formik'
import Head from 'next/head'
import Link from 'next/link'
import * as React from 'react'
import * as Yup from 'yup'
import { postRequestPasswordReset } from '~lib/api'
import { isFormal } from '~lib/config'
import useLocale from '~locales/useLocale'
import { Loading } from '~ui/blocks/Loading'
import { Box, Button, Callout, Card, Input, Row, Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'

import de from './request.de'

export default function PasswordResetRequestPage() {
  const t = useLocale({ de })
  const [loading, setLoading] = React.useState(false)
  const [done, setDone] = React.useState(false)

  const handleSubmit = async ({ email }) => {
    setLoading(true)

    await postRequestPasswordReset(email)

    setDone(true)
    setLoading(false)
  }

  const EmailSchema = Yup.object().shape({
    email: Yup.string().required(t('emailRequired')),
  })

  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">{t('pageTitle')}</title>
      </Head>
      <Text as="h2" variant="h2">
        {t('pageHeadline')}
      </Text>
      <Box height={4} />
      <Text>
        <p>{t('pageExplanation')}</p>
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
            Falls {isFormal ? 'Ihre' : 'Deine'} Email Adresse bei uns
            registriert war haben wir {isFormal ? 'Ihnen' : 'dir'} einen Link
            zum Passwort zurückzusetzen geschickt. Bitte{' '}
            {isFormal ? 'überprüfen Sie Ihr' : 'überprüfe dein'} Email Konto.
            Sollte das nicht funktioniert haben,
            {isFormal ? 'wenden Sie' : 'wende Dich'} bitte an useren{' '}
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
