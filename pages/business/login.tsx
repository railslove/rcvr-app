import { Form, Formik } from 'formik'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useQueryClient } from 'react-query'
import * as Yup from 'yup'
import { login } from '~lib/actions/login'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import useLocale from '~locales/useLocale'
import { Loading } from '~ui/blocks/Loading'
import { Box, Button, Card, Input, Row, Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'

const LoginPage: React.FC<WithOwnerProps> = () => {
  const router = useRouter()
  const { t } = useLocale('pages/business/login')

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required(t('emailRequired')),
    password: Yup.string().required(t('passwordRequired')),
  })

  const [loading, setLoading] = React.useState(false)
  const queryClient = useQueryClient()

  const handleSubmit = async ({ email, password }, bag) => {
    try {
      setLoading(true)
      const owner = await login({ email, password })
      queryClient.clear()

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
        bag.setFieldError('password', t('wrongEmailOrPassword'))
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
        <title key="title">{t('pageTitle')} | recover</title>
      </Head>
      <Text as="h2" variant="h2">
        {t('title')}
      </Text>
      <Box height={4} />
      <Text>
        <p>{t('message')}</p>
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
            <Input
              name="email"
              label={t('inputEmailLabel')}
              autoComplete="email"
            />
            <Box height={4} />
            <Input
              name="password"
              label={t('inputPasswordLabel')}
              hint={
                <>
                  {t('inputPasswordHint1')}
                  <strong>{t('inputPasswordHint2')}</strong>
                  {t('inputPasswordHint3')}
                </>
              }
              type="password"
              autoComplete="current-password"
            />
            <Box height={5} />
            <Button type="submit" css={{ width: '100%' }}>
              {t('loginButtonText')}
            </Button>
          </Form>
        </Card>
      </Formik>

      <Row justifyContent="center" my={6}>
        <Link href="/business/password-reset/request" as="a" passHref>
          <Text variant="link">{t('forgottenPasswordText')}</Text>
        </Link>
      </Row>
    </MobileApp>
  )
}

export default withOwner({ redirect: 'authorized' })(LoginPage)
