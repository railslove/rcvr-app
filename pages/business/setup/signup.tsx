import * as React from 'react'
import Head from 'next/head'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { queryCache } from 'react-query'

import { isCareEnv, isFreseniusEnv, isHealthEnv } from '~lib/config'
import { privacyUrl } from '~ui/whitelabels'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { signup } from '~lib/actions'
import { Step2 } from '~ui/svg'
import { Input, Button, Box, Text, Card, Row, Checkbox } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'
import { Loading } from '~ui/blocks/Loading'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const LoginSchema = Yup.object().shape({
  name: Yup.string().required('Name muss angegeben werden.'),
  email: Yup.string().required('Email muss angegeben werden.'),
  phone: Yup.string().required('Telefonnummer muss angegeben werden.'),
  companyName: Yup.string().required('Unternehmensname muss angegeben werden.'),
  password: Yup.string()
    .required('Password muss angegeben werden.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-[\]{}])[A-Za-z\d$&+,:;=?@#|'<>.^*()%!-[\]{}]{8,}$/,
      'Das Passwort muss mindestens 8 Zeichen lang sein. Mindestens ein Großbuchstabe, ein Kleinbuchstabe, eine Zahl und ein Sonderzeichen.'
    ),
  confirmPassword: Yup.string()
    .required('Passwordwiederholung muss angegeben werden.')
    .oneOf([Yup.ref('password'), null], 'Passwörter stimmen nicht überein.'),
  confirmContract: Yup.bool().oneOf(
    [true],
    'Sie müssen dem Vertrag zustimmen.'
  ),
})

const SetupSignupPage: React.FC<WithOwnerProps> = () => {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (
    { name, email, phone, companyName, password },
    bag
  ) => {
    try {
      setLoading(true)
      const affiliate = isCareEnv
        ? 'care'
        : localStorage.getItem('rcvr_affiliate')

      await signup({ name, companyName, phone, email, password, affiliate })
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
          {isCareEnv
            ? 'Mit Ihrem Account können Sie QR Codes erstellen und Checkins Ihrer Gäste verwalten.'
            : 'Mit deinem Account kannst du QR Codes erstellen und Checkins deiner Gäste verwalten.'}
        </p>
      </Text>
      <Box height={6} />

      <Formik
        initialValues={{
          name: '',
          companyName: '',
          phone: '',
          email: '',
          password: '',
          confirmPassword: '',
          confirmContract: !isCareEnv && !isHealthEnv,
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Card variant="form" mx={-4}>
            <Loading show={loading} />
            <Form>
              <Input name="name" label={isCareEnv ? 'Ihr Name' : 'Dein Name'} />
              <Box height={4} />
              <Input
                name="companyName"
                label={
                  isCareEnv
                    ? 'Name Ihres Unternehmens'
                    : 'Name deines Unternehmens'
                }
              />
              <Box height={4} />
              <Input
                name="phone"
                label={isCareEnv ? 'Ihre Telefonnummer' : 'Deine Telefonnummer'}
              />
              <Box height={8} />
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
                    : 'Das Passwort muss mindestens 8 Zeichen lang sein. Mindestens ein Großbuchstabe, ein Kleinbuchstabe, eine Zahl und ein Sonderzeichen.'
                }
              />
              <Box height={4} />
              <Input
                name="confirmPassword"
                label="Passwort wiederholen"
                type="password"
                autoComplete="new-password"
              />
              {isCareEnv && (
                <>
                  <Box height={6} />
                  <Checkbox
                    name="confirmContract"
                    label={
                      <span>
                        Ich akzeptiere den{' '}
                        <InlineLink href="/VertragBFSCare.pdf" target="_blank">
                          Nutzungsvertrag
                        </InlineLink>
                      </span>
                    }
                  />
                </>
              )}
              {isHealthEnv && (
                <>
                  <Box height={6} />
                  <Checkbox
                    name="confirmContract"
                    label={
                      <span>
                        Ich akzeptiere den{' '}
                        <InlineLink
                          href="/VertragBFSHealth.pdf"
                          target="_blank"
                        >
                          Nutzungsvertrag
                        </InlineLink>
                      </span>
                    }
                  />
                </>
              )}

              <Box height={6} />
              <Text variant="fineprint">
                <p>
                  Mit dem Betätigen des Buttons{' '}
                  {isCareEnv ? 'erklären Sie sich' : 'erkläre ich mich'} mit den{' '}
                  <a
                    href={
                      isFreseniusEnv
                        ? privacyUrl
                        : 'https://railslove.com/privacy/'
                    }
                  >
                    Datenschutzbestimmungen
                  </a>{' '}
                  einverstanden.
                </p>
              </Text>
              <Box height={5} />
              <Button type="submit" css={{ width: '100%' }}>
                Registrieren
              </Button>
            </Form>
          </Card>
        )}
      </Formik>
    </MobileApp>
  )
}

export const InlineLink = styled('a')(
  css({
    color: '#226EEC',
    textDecoration: 'underline',
  })
)

export default withOwner({ redirect: 'authorized' })(SetupSignupPage)
