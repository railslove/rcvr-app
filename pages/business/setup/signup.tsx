import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { Form, Formik } from 'formik'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as React from 'react'
import { queryCache } from 'react-query'
import * as Yup from 'yup'
import { signup } from '~lib/actions'
import { isCareEnv, isFormal, isHealthEnv } from '~lib/config'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { Loading } from '~ui/blocks/Loading'
import { Box, Button, Card, Checkbox, Input, Row, Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'
import { PersonalData } from '~ui/svg'
import { signupText } from '~ui/whitelabels'
import Avv from './avv'

const LoginSchema = Yup.object().shape({
  name: Yup.string().required('Name muss angegeben werden.'),
  email: Yup.string().required('Email muss angegeben werden.'),
  phone: Yup.string().required('Telefonnummer muss angegeben werden.'),
  companyName: Yup.string().required('Unternehmensname muss angegeben werden.'),
  password: Yup.string()
    .required('Passwort muss angegeben werden.')
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
      const affiliate = localStorage.getItem('rcvr_affiliate')

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
      <Text as="h3" variant="h3">
        Account erstellen (1/3)
      </Text>
      <Box height={6} />
      <Row justifyContent="center">
        <PersonalData />
      </Row>
      <Box height={6} />
      <Text>{signupText}</Text>
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
            <Text as="h2" variant="h2">
              1. Persönliche Angaben
            </Text>
            <Box height={4} />
            <Form>
              <Input name="name" label={isFormal ? 'Ihr Name' : 'Dein Name'} />
              <Box height={4} />
              <Input
                name="companyName"
                label={
                  isFormal
                    ? 'Name Ihres Unternehmens'
                    : 'Name deines Unternehmens'
                }
              />
              <Box height={4} />
              <Input
                name="phone"
                label={isFormal ? 'Ihre Telefonnummer' : 'Deine Telefonnummer'}
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
                        </InlineLink>{' '}
                        und die{'  '}
                        <InlineLink
                          href="https://www.recover-health.de/unser-pricing"
                          target="_blank"
                        >
                          Preise
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
                          href="/Nutzungsvertrag_recover-health.pdf"
                          target="_blank"
                        >
                          Nutzungsvertrag
                        </InlineLink>{' '}
                        und die{'  '}
                        <InlineLink
                          href="https://www.recover-health.de/unser-pricing"
                          target="_blank"
                        >
                          Preise
                        </InlineLink>
                      </span>
                    }
                  />
                </>
              )}

              <Box height={6} />
              <Avv />
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
