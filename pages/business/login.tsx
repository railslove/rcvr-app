import { Form, Formik } from 'formik'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { queryCache } from 'react-query'
import * as Yup from 'yup'
import { login } from '~lib/actions/login'
import { isFormal } from '~lib/config'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { Loading } from '~ui/blocks/Loading'
import { Box, Button, Card, Input, Row, Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email muss angegeben werden.'),
  password: Yup.string().required('Password muss angegeben werden.'),
})

const LoginPage: React.FC<WithOwnerProps> = () => {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async ({ email, password }, bag) => {
    try {
      setLoading(true)
      const owner = await login({ email, password })
      queryCache.clear()

      if (!owner.publicKey) {
        // If the owner has no publicKey here, it means the owner didn't finish
        // the onboarding correctly (or something went wrong). There's no keypair
        // yet. Send them back to the key setup.
        router.replace('/business/setup/success')
      } else {
        router.replace('/business/dashboard')
      }
    } catch (error) {
      if (error.response?.status === 401) {
        bag.setFieldError('password', 'Email oder Passwort falsch.')
      } else {
        throw error
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <MobileApp>
      <Head>
        <title key="title">Login | recover</title>
      </Head>
      <Text as="h2" variant="h2">
        Login für Betriebe
      </Text>
      <Box height={4} />
      <Text>
        <p>
          {isFormal
            ? 'Seit Corona sind Einrichtungen verpflichtet die Kontaktdaten von Gästen zu erfassen. Ersparen Sie sich die Zettelwirtschaft! recover ist die einfachste Lösung für Sie - und die sicherste für Ihre Besucher.'
            : 'Seit Corona sind viele Betriebe und Einrichtungen verpflichtet, Kontaktdaten zu erfassen. Erspar Dir die Zettelwirtschaft! recover ist die einfachste Lösung für Dich und die sicherste für Deine Besucher oder Gäste.'}
        </p>
      </Text>
      <Box height={4} />

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        <Card variant="form" mx={-4}>
          <Loading show={loading} />
          <Form>
            <Input name="email" label="Email" autoComplete="email" />
            <Box height={4} />
            <Input
              name="password"
              label="Passwort"
              hint={
                <>
                  {isFormal
                    ? 'Ihr Passwort haben Sie während der Registrierung selbst gewählt. Das ist '
                    : 'Dein Password hast du während der Registrierung selbst gewählt. Das ist '}
                  <strong>nicht</strong>
                  {isFormal
                    ? ' Ihr privater Schlüssel.'
                    : ' dein privater Schlüssel.'}
                </>
              }
              type="password"
              autoComplete="current-password"
            />
            <Box height={5} />
            <Button type="submit" css={{ width: '100%' }}>
              Login
            </Button>
          </Form>
        </Card>
      </Formik>

      <Row justifyContent="center" my={6}>
        <Link href="/business/password-reset/request" as="a" passHref>
          <Text variant="link">Passwort vergessen?</Text>
        </Link>
      </Row>
    </MobileApp>
  )
}

export default withOwner({ redirect: 'authorized' })(LoginPage)
