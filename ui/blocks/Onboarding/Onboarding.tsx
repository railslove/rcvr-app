import { Form, Formik } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'
import { AreaRes } from '~lib/api'
import { isCareEnv } from '~lib/config'
import { Guest, GuestHealthDocumentEnum } from '~lib/db'
import { phoneValidator } from '~lib/validators/phoneValidator'
import { ArrowsLeft, ArrowsRight } from '~ui/anicons'
import { Box, Button, Checkbox, Radio, Input, Text } from '~ui/core'

import useLocaleObject from '~locales/useLocaleObject'
import OnboardingLocales from '~ui/blocks/Onboarding/Onboarding.locales'

type OnboardingProps = {
  onSubmit: (guest: Guest, options: { rememberMe: boolean }) => void
  prefilledGuest?: Guest
  area: AreaRes
  hideRememberMe?: boolean
  onAbort?: () => void
  submitButtonValue?: string
}

export const Onboarding: React.FC<OnboardingProps> = ({
  area,
  onSubmit,
  prefilledGuest,
  hideRememberMe,
  onAbort,
  submitButtonValue,
}) => {
  const { t } = useLocaleObject(OnboardingLocales)

  const initialValues = {
    name: prefilledGuest?.name || '',
    phone: prefilledGuest?.phone || '',
    address: prefilledGuest?.address || '',
    postalCode: prefilledGuest?.postalCode || '',
    city: prefilledGuest?.city || '',
    rememberMe: prefilledGuest ? true : false,
    providedHealthDocument: prefilledGuest?.providedHealthDocument,
  }
  if (isCareEnv) initialValues['resident'] = ''

  const yupShape = {
    name: Yup.string().required(t('nameRequired')),
    phone: phoneValidator,
    address: Yup.string().required(t('addressRequired')),
    postalCode: Yup.string().required(t('zipRequired')),
    city: Yup.string().required(t('cityRequired')),
    rememberMe: Yup.boolean(),
  }

  if (area.companyNeedToShowCoronaTest > 0 && !area.testExemption)
    yupShape['providedHealthDocument'] = Yup.string().required(
      t('healthDocRequired')
    )

  if (isCareEnv)
    yupShape['resident'] = Yup.string().required(t('residentRequired'))

  const OnboardingSchema = Yup.object().shape(yupShape)
  const provide_test_label = `${t('provideTestLabel1')} ${
    area.companyNeedToShowCoronaTest
  } ${t('provideTestLabel2')}.`

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={OnboardingSchema}
        onSubmit={({ rememberMe, ...fields }) => {
          onSubmit(fields, { rememberMe })
        }}
      >
        <Form>
          <Input name="name" label={t('nameInputLabel')} autoComplete="name" />
          <Box height={4} />
          <Input
            name="phone"
            label={t('phoneInputLabel')}
            type="tel"
            autoComplete="tel"
          />
          <Box height={4} />
          <Input
            name="address"
            label={t('addressInputLabel')}
            autoComplete="street-address"
          />
          <Box height={4} />
          <Input
            name="postalCode"
            label={t('zipInputLabel')}
            autoComplete="postal-code"
          />
          <Box height={4} />
          <Input
            name="city"
            label={t('cityInputLabel')}
            autoComplete="address-level2"
          />
          {isCareEnv && (
            <>
              <Box height={4} />
              <Input name="resident" label={t('residentInputLabel')} />
            </>
          )}
          {area.companyNeedToShowCoronaTest > 0 && !area.testExemption && (
            <>
              <Box height={3} />
              <Radio
                name="providedHealthDocument"
                label={provide_test_label}
                value={GuestHealthDocumentEnum.tested}
                hideError={true}
              />
              <Radio
                name="providedHealthDocument"
                label={`${t('hadCoronaInputLabel')}.`}
                value={GuestHealthDocumentEnum.hadCorona}
                hideError={true}
              />
              <Radio
                name="providedHealthDocument"
                label={`${t('vaccinatedInputLabel')}.`}
                value={GuestHealthDocumentEnum.vaccinated}
              />
            </>
          )}
          {hideRememberMe || (
            <>
              <Box height={3} />
              <Checkbox name="rememberMe" label={t('rememberMeInputLabel')} />
            </>
          )}
          <Box height={5} />
          <Button
            type="submit"
            css={{ width: '100%' }}
            left={<ArrowsRight color="green" />}
            right={<ArrowsLeft color="green" />}
            dataAttributes={{ 'wfd-action': 'check-in' }}
          >
            {submitButtonValue || t('submitButtonFallbackText')}
          </Button>
          {onAbort && (
            <>
              <Box height={3} />
              <Button css={{ width: '100%' }} onClick={onAbort}>
                ({t('abortButtonText')})
              </Button>
            </>
          )}
          <Box height={6} />
          <Text variant="fineprint">{t('aggreeFineprint')}</Text>
        </Form>
      </Formik>
    </div>
  )
}
