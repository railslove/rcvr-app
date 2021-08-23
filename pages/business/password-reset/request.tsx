import { Form, Formik } from 'formik'
import Head from 'next/head'
import Link from '~ui/core/Link/Link'
import * as React from 'react'
import * as Yup from 'yup'
import { postRequestPasswordReset } from '~lib/api'
import usePageLocale from '~locales/usePageLocale'
import { Loading } from '~ui/blocks/Loading'
import { Box, Button, Callout, Card, Input, Row, Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'
import RecoverTeamEmailLink from '~ui/core/Link/RecoverTeamEmailLink'
import PageTitle from '~ui/blocks/Title/PageTitle'

export default function PasswordResetRequestPage() {
  const { t } = usePageLocale('business/password-reset/request')
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
        <PageTitle>{t('pageTitle')}</PageTitle>
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
                {t('resetPasswordButtonText')}
              </Button>
            </Form>
          </Card>
        </Formik>
      )}
      {done && (
        <Callout>
          <Text>
            {t('doneMessage')}
            <RecoverTeamEmailLink>{t('support')}</RecoverTeamEmailLink>.
          </Text>
        </Callout>
      )}

      <Row justifyContent="center" my={6}>
        <Link href="/business/login" as="a" passHref>
          <Text variant="link">{t('goToLoginLinkText')}</Text>
        </Link>
      </Row>
    </MobileApp>
  )
}
