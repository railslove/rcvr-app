import React from 'react'

import { Box, Button, Input, Text } from '~ui/core'
import { ArrowsRight } from '~ui/anicons'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import IBAN from 'iban'
import useLocaleAsync from '~locales/useLocaleAsync'

export default function SepaForm({ onSubmit, disabled }) {
  const { t } = useLocaleAsync('ui/blocks/SepaForm')

  const SepaSchema = Yup.object().shape({
    name: Yup.string().required(t('nameRequired')),
    email: Yup.string().required(t('emailRequired')),
    iban: Yup.string()
      .test('iban-valid', t('ibanInvalid'), (value) => IBAN.isValid(value))
      .required(t('ibanRequired')),
  })

  return (
    <Formik
      initialValues={{ email: '', name: '', iban: '' }}
      validationSchema={SepaSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <Input
          name="email"
          label={t('emailInputLabel')}
          autoComplete="email"
          type="email"
        />
        <Box height={4} />

        <Input name="name" label={t('nameInputLabel')} autoComplete="name" />
        <Box height={4} />
        <Input name="iban" label={t('ibanInputLabel')} autoComplete="iban" />
        <Box height={4} />
        <Text>{t('consentText')}</Text>
        <Box height={4} />
        <Button
          type="submit"
          disabled={disabled}
          right={<ArrowsRight color="pink" />}
        >
          {t('submitButtonText')}
        </Button>
      </Form>
    </Formik>
  )
}
