import { Form, Formik } from 'formik'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import * as Yup from 'yup'
import { postResetPassword } from '~lib/api'
import { isFormal } from '~lib/config'
import { Loading } from '~ui/blocks/Loading'
import { Box, Button, Callout, Card, Input, Row, Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'

const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Passwort muss angegeben werden.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-[\]{}])[A-Za-z\d$&+,:;=?@#|'<>.^*()%!-[\]{}]{8,}$/,
      'Das Passwort muss mindestens 8 Zeichen lang sein. Mindestens ein Großbuchstabe, ein Kleinbuchstabe, eine Zahl und ein Sonderzeichen.'
    ),
  passwordConfirmation: Yup.string()
    .required('Passwortbestätigung muss angegeben werden.')
    .oneOf([Yup.ref('password'), null], 'Passwörter stimmen nicht überein.'),
})

export default function PasswordResetNewPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const handleSubmit = async ({ password }) => {
    setLoading(true)
    setError(null)

    postResetPassword(password, router.query.token)
      .then(() => router.replace('/business/login'))
      .catch((e) => {
        setError(
          e.response.status === 404
            ? 'Leider ist der Link abgelaufen. Bitte fordere einen neuen Link an.'
            : 'Etwas ist schiefgegangen. Bitte versuch es erneut.'
        )
        setLoading(false)
      })
  }

  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">Passwort Zurücksetzen | recover</title>
      </Head>
      <Text as="h2" variant="h2">
        Passwort Zurücksetzen
      </Text>
      <Box height={4} />
      <Text>
        <p>
          {isFormal
            ? 'Bitte gib ein neues Passwort an mit dem du Dich von jetzt an anmelden kannst.'
            : 'Bitte geben Sie ein neues Passwort an mit dem Sie sich von jetzt an anmelden können'}
        </p>
      </Text>
      <Box height={4} />

      {error && (
        <>
          <Callout variant="danger">
            <Text>{error}</Text>
          </Callout>
          <Box height={5} />
        </>
      )}

      <Formik
        initialValues={{ password: '', passwordConfirmation: '' }}
        validationSchema={PasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Card variant="form" mx={-4}>
            <Loading show={loading} />
            <Form>
              <Input
                name="password"
                label="Passwort"
                type="password"
                autoComplete="new-password"
                hint={
                  values.password !== ''
                    ? undefined
                    : 'Das Passwort muss mindestens 8 Zeichen lang sein. Mindestens ein Großbuchstabe, ein Kleinbuchstabe, eine Zahl und ein Sonderzeichen.'
                }
              />
              <Box height={4} />
              <Input
                name="passwordConfirmation"
                label="Passwort Wiederholen"
                type="password"
                autoComplete="new-password"
              />
              <Box height={5} />
              <Button type="submit" css={{ width: '100%' }}>
                Passwort Zurücksetzen
              </Button>
            </Form>
          </Card>
        )}
      </Formik>

      <Row justifyContent="center" my={6}>
        <Link href="/business/login" as="a" passHref>
          <Text variant="link">Zum login</Text>
        </Link>
      </Row>
    </MobileApp>
  )
}
