import { Form, Formik } from 'formik'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import * as Yup from 'yup'
import { postResetPassword } from '~lib/api'
import { createPasswordValidator } from '~lib/validators/passwordValidator'
import useLocale from '~locales/useLocale'
import { Loading } from '~ui/blocks/Loading'
import { Box, Button, Callout, Card, Input, Row, Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'

export default function PasswordResetNewPage() {
  const { t } = useLocale('business/password-reset/new')
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const PasswordSchema = Yup.object().shape({
    password: createPasswordValidator({
      requiredText: t('passwordRequired'),
      maxLengthText: t('passwordMaxLength'),
      shouldMatchText: t('passwordShouldMatch'),
    }),
    passwordConfirmation: Yup.string()
      .required(t('passwordConfirmationRequired'))
      .oneOf([Yup.ref('password'), null], t('passwordsAreNotEqual')),
  })

  const handleSubmit = async ({ password }) => {
    setLoading(true)
    setError(null)

    postResetPassword(password, router.query.token)
      .then(() => router.replace('/business/login'))
      .catch((e) => {
        setError(
          e.response.status === 404 ? t('loginError404') : t('loginError')
        )
        setLoading(false)
      })
  }

  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">{t('pageTitle')} | recover</title>
      </Head>
      <Text as="h2" variant="h2">
        {t('pageHeadline')}
      </Text>
      <Box height={4} />
      <Text>
        <p>{t('pageExplanation')}</p>
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
                type="password"
                name="password"
                hint={
                  values.password !== '' ? undefined : t('passwordInputHint')
                }
                label={t('passwordInputLabel')}
                autoComplete="new-password"
              />
              <Box height={4} />
              <Input
                name="passwordConfirmation"
                type="password"
                label={t('passwordConfirmationInputLabel')}
                autoComplete="new-password"
              />
              <Box height={5} />
              <Button type="submit" css={{ width: '100%' }}>
                {t('passwordResetButtonText')}
              </Button>
            </Form>
          </Card>
        )}
      </Formik>

      <Row justifyContent="center" my={6}>
        <Link href="/business/login" as="a" passHref>
          <Text variant="link">{t('loginLinkText')}</Text>
        </Link>
      </Row>
    </MobileApp>
  )
}
