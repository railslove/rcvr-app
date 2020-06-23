import * as React from 'react'
import Head from 'next/head'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { queryCache } from 'react-query'

import { isCareEnv } from '~lib/config'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { signup } from '~lib/actions'
import { Step2 } from '~ui/svg'
import { Input, Button, Box, Text, Card, Row } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'
import { Loading } from '~ui/blocks/Loading'

const LoginSchema = Yup.object().shape({
  name: Yup.string().required('Name muss angegeben werden.'),
  email: Yup.string().required('Email muss angegeben werden.'),
  password: Yup.string()
    .required('Password muss angegeben werden.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-[\]{}])[A-Za-z\d$&+,:;=?@#|'<>.^*()%!-[\]{}]{8,}$/,
      'Das Passwort muss mindestens 8 Zeichen lang sein. Mindestens ein Großbuchstabe, ein Kleinbuchstabe, eine Zahl und ein Sonderzeichen.'
    ),
  confirmPassword: Yup.string()
    .required('Passwordwiederholung muss angegeben werden.')
    .oneOf([Yup.ref('password'), null], 'Passwörter stimmen nicht überein.'),
})

const SetupSignupPage: React.FC<WithOwnerProps> = () => {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async ({ name, email, password }, bag) => {
    try {
      setLoading(true)
      const affiliate = isCareEnv
        ? 'CARE'
        : localStorage.getItem('rcvr_affiliate')

      await signup({ name, email, password, affiliate })
      queryCache.clear() // `owner` is cached and the next page would otherwise first think there's still no user
      router.replace('/business/setup/success')
    } catch (error) {
      if (error.response?.status === 422) {
        bag.setFieldError('email', 'Diese Email ist bereits registriert.')
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
        <title key="title">Account erstellen | recover</title>
      </Head>
      <Text as="h2" variant="h2">
        Account erstellen
      </Text>
      <Box height={6} />
      <Row justifyContent="center">
        <Step2 />
      </Row>
      <Box height={6} />
      <Text>
        <p>
          Mit deinem Account kannst du QR Codes erstellen und Checkins deiner
          Gäste verwalten.
        </p>
      </Text>
      <Box height={6} />

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Card variant="form" mx={-4}>
            <Loading show={loading} />
            <Form>
              <Input name="name" label="Dein Name" />
              <Box height={4} />
              <Input name="email" label="Email" autoComplete="email" />
              <Box height={4} />
              <Input
                name="password"
                label="Passwort"
                type="password"
                autoComplete="new-password"
                hint={
                  values.password !== ''
                    ? undefined
                    : 'Dein Passwort muss mindestens 8 Zeichen lang sein. Mindestens ein Großbuchstabe, ein Kleinbuchstabe, eine Zahl und ein Sonderzeichen.'
                }
              />
              <Box height={4} />
              <Input
                name="confirmPassword"
                label="Passwort wiederholen"
                type="password"
                autoComplete="new-password"
              />
              <Box height={5} />
              <Button type="submit" css={{ width: '100%' }}>
                Registrieren
              </Button>
              <Box height={6} />
              <Text variant="fineprint">
                <p>
                  Mit dem betätigen des Buttons erkläre ich mich mit den{' '}
                  <a href="https://railslove.com/privacy/">
                    Datenschutzbestimmungen
                  </a>{' '}
                  einverstanden.
                </p>
              </Text>
            </Form>
          </Card>
        )}
      </Formik>
    </MobileApp>
  )
}

export default withOwner({ redirect: 'authorized' })(SetupSignupPage)
