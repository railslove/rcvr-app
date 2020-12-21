import React from 'react'

import { Box, Button, Input, Text } from '~ui/core'
import { ArrowsRight } from '~ui/anicons'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import * as IBAN from 'iban'

const SepaSchema = Yup.object().shape({
  name: Yup.string().required('Kontoinhaber muss angegeben werden.'),
  email: Yup.string().required('Email muss angegeben werden.'),
  iban: Yup.string()
    .test('iban-valid', 'IBAN ist ungültig', (value) => IBAN.isValid(value))
    .required('IBAN muss angegeben werden.'),
})

export default function SepaForm({ onSubmit, disabled }) {
  return (
    <Formik
      initialValues={{ email: '', name: '', iban: '' }}
      validationSchema={SepaSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <Input name="email" label="Email" autoComplete="email" type="email" />
        <Box height={4} />

        <Input name="name" label="Kontoinhaber" autoComplete="name" />
        <Box height={4} />
        <Input name="iban" label="IBAN" autoComplete="iban" />
        <Box height={4} />
        <Text>
          Ich ermächtige/ Wir ermächtigen (A) Ping Pong Labs GbR und Stripe,
          unserem Zahlungsdienstleister, Zahlungen von meinem/ unserem Konto
          mittels Lastschrift einzuziehen. Zugleich (B) weise ich mein/ weisen
          wir unser Kreditinstitut an, die von Ping Pong Labs GbR und Stripe,
          unserem Zahlungsdienstleister, auf mein/ unser Konto gezogenen
          Lastschriften einzulösen.
        </Text>
        <Box height={4} />
        <Button
          type="submit"
          disabled={disabled}
          right={<ArrowsRight color="pink" />}
        >
          SEPA Lastschriftverfahren bestätigen
        </Button>
      </Form>
    </Formik>
  )
}
