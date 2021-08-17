import React from 'react'

import { Box, Button, Input, Text } from '~ui/core'
import { ArrowsRight } from '~ui/anicons'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import IBAN from 'iban'
import useLocaleAsync from '~locales/useLocaleAsync'

const SepaSchema = Yup.object().shape({
  name: Yup.string().required('Kontoinhaber muss angegeben werden.'),
  email: Yup.string().required('Email muss angegeben werden.'),
  iban: Yup.string()
    .test('iban-valid', 'IBAN ist ungültig', (value) => IBAN.isValid(value))
    .required('IBAN muss angegeben werden.'),
})

export default function SepaForm({ onSubmit, disabled }) {
  const { t } = useLocaleAsync('ui/blocks/SepaForm')

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
