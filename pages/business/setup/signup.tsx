import styled from '@emotion/styled'
import { css } from '@emotion/react'
import * as Yup from 'yup'
import * as React from 'react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'

import { signup } from '~lib/actions'
import usePageLocale from '~locales/usePageLocale'
import { PostSignup } from '~lib/api'
import { useAffiliate } from '~lib/hooks/useAffiliate'
import { createPhoneValidator } from '~lib/validators/phoneValidator'
import { isCareEnv, isHealthEnv } from '~lib/config'
import { createPasswordValidator } from '~lib/validators/passwordValidator'

import { Loading } from '~ui/blocks/Loading'
import { MobileApp } from '~ui/layouts/MobileApp'
import { PersonalData } from '~ui/svg'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { Box, Button, Card, Checkbox, Input, Row, Text } from '~ui/core'

export const InlineLink = styled('a')(
  css({
    color: '#226EEC',
    textDecoration: 'underline',
  })
)

const Avv: React.FC = () => {
  const { t } = usePageLocale('business/setup/signup')

  return (
    <Text variant="fineprint">
      <p>
        {t('avvMessage1')}{' '}
        <a href={t('avvPrivacyPolicyLink')}>{t('avvPrivacyPolicyText')}</a>{' '}
        {t('avvMessage2')}{' '}
        <a href={t('avvLink')} target="_blank" rel="noopener noreferrer">
          {t('avvLinkText')}
        </a>{' '}
        {t('avvMessage3')}.
      </p>
    </Text>
  )
}

export type SignUpFormValues = PostSignup & {
  confirmPassword: string
  confirmContract: boolean
}

const getInitialSignUpFormValues = (
  values: Partial<SignUpFormValues> = {}
): SignUpFormValues => ({
  name: '',
  companyName: '',
  phone: '',
  street: '',
  zip: '',
  city: '',
  email: '',
  password: '',
  confirmPassword: '',
  ...values,
  confirmContract: !isCareEnv && !isHealthEnv,
})

const SetupSignupPage: React.FC<WithOwnerProps> = () => {
  const { t } = usePageLocale('business/setup/signup')
  const { affiliateName } = useAffiliate()

  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const queryClient = useQueryClient()

  const SignUpSchema = Yup.object().shape({
    name: Yup.string().required(t('nameRequired')),
    email: Yup.string().required(t('emailRequired')),
    phone: createPhoneValidator({
      name: 'phone',
      invalid: t('phoneInvalid'),
      required: t('phoneRequired'),
    }),
    street: Yup.string().required(t('streetRequired')),
    zip: Yup.string().required(t('zipRequired')),
    city: Yup.string().required(t('cityRequired')),
    companyName: Yup.string().required(t('companyNameRequired')),
    password: createPasswordValidator({
      requiredText: t('passwordRequired'),
      maxLengthText: t('passwordMaxLength'),
      shouldMatchText: t('passwordShouldMatch'),
    }),
    confirmPassword: Yup.string()
      .required(t('confirmPasswordRequired'))
      .oneOf([Yup.ref('password'), null], t('passwordsDoNotMatch')),
    confirmContract: Yup.bool().oneOf([true], t('confirmContractRequired')),
  })

  const handleSubmit = async (
    { name, email, phone, street, zip, city, companyName, password },
    bag
  ) => {
    try {
      setLoading(true)

      await signup({
        name,
        companyName,
        phone,
        street,
        zip,
        city,
        email,
        password,
        affiliate: affiliateName,
      })
      queryClient.clear() // `owner` is cached and the next page would otherwise first think there's still no user
      router.replace('/business/setup/success')
    } catch (error) {
      if (error.response?.status === 422) {
        bag.setFieldError('email', t('emailRegisteredError'))
      } else {
        throw error
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <MobileApp pageTitle={t('title')}>
      <Text as="h3" variant="h3">
        {t('title')} (1/3)
      </Text>
      <Box height={6} />
      <Row justifyContent="center">
        <PersonalData />
      </Row>
      <Box height={6} />
      <Text>{t('signUpText')}</Text>
      <Box height={6} />
      <Formik<SignUpFormValues>
        initialValues={getInitialSignUpFormValues()}
        validationSchema={SignUpSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Card variant="form" mx={-4}>
            <Loading show={loading} />
            <Text as="h2" variant="h2">
              1. {t('headline')}
            </Text>
            <Box height={4} />
            <Form>
              <Input name="name" label={t('nameLabel')} />
              <Box height={4} />
              <Input name="companyName" label={t('companyNameLabel')} />
              <Box height={4} />
              <Input
                name="phone"
                label={t('phoneLabel')}
                type="tel"
                autoComplete="tel"
              />
              <Box height={4} />
              <Input
                name="street"
                label={t('streetLabel')}
                autoComplete="street-address"
              />
              <Box height={4} />
              <Input
                name="zip"
                label={t('zipLabel')}
                autoComplete="postal-code"
              />
              <Box height={4} />
              <Input
                name="city"
                label={t('cityLabel')}
                autoComplete="address-level2"
              />
              <Box height={8} />
              <Input
                name="email"
                label={t('emailLabel')}
                autoComplete="email"
              />
              <Box height={4} />
              <Input
                hint={values.password !== '' ? undefined : t('passwordHint')}
                type="password"
                name="password"
                label={t('passwordLabel')}
                autoComplete="new-password"
              />
              <Box height={4} />
              <Input
                type="password"
                name="confirmPassword"
                label={t('passwordConfirmLabel')}
                autoComplete="new-password"
              />
              {isCareEnv && (
                <>
                  <Box height={6} />
                  <Checkbox
                    name="confirmContract"
                    label={
                      <span>
                        {t('termsOfUse1')}{' '}
                        <InlineLink
                          href={t('termsOfUseContractLink')}
                          target="_blank"
                        >
                          {t('termsOfUseContractLinkText')}
                        </InlineLink>{' '}
                        {t('termsOfUse2')}
                        {'  '}
                        <InlineLink href={t('pricingLink')} target="_blank">
                          {t('pricingLinkText')}
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
                        {t('confirmContract1')}{' '}
                        <InlineLink
                          href={t('confirmContractLink')}
                          target="_blank"
                        >
                          {t('confirmContractLinkText')}
                        </InlineLink>{' '}
                        {t('confirmContract2')}
                        {'  '}
                        <InlineLink href={t('pricingLink')} target="_blank">
                          {t('pricingLinkText')}
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
                {t('submitButtonText')}
              </Button>
            </Form>
          </Card>
        )}
      </Formik>
    </MobileApp>
  )
}

export default withOwner({ redirect: 'authorized' })(SetupSignupPage)
