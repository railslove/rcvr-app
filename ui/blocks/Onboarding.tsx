import { Form, Formik } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'
import { isCareEnv } from '~lib/config'
import { Guest } from '~lib/db'
import { ArrowsLeft, ArrowsRight } from '~ui/anicons'
import { Box, Button, Checkbox, Input, Text } from '~ui/core'

type OnboardingProps = {
  onSubmit: (guest: Guest, options: { rememberMe: boolean }) => void
  prefilledGuest?: Guest
  hideRememberMe?: boolean
  onAbort?: () => void
  submitButtonValue?: string
}

const yupShape = {
  name: Yup.string().required('Name muss angegeben werden.'),
  phone: Yup.string().required('Telefonnummer muss angegeben werden.'),
  address: Yup.string().required('Adresse muss angegeben werden.'),
  postalCode: Yup.string().required('Postleitzahl muss angegeben werden.'),
  city: Yup.string().required('Ort muss angegeben werden.'),
  rememberMe: Yup.boolean(),
}

if (isCareEnv)
  yupShape['resident'] = Yup.string().required(
    'Bewohnername muss angegeben werden.'
  )

const OnboardingSchema = Yup.object().shape(yupShape)

export const Onboarding: React.FC<OnboardingProps> = ({
  onSubmit,
  prefilledGuest,
  hideRememberMe,
  onAbort,
  submitButtonValue = 'Check in',
}) => {
  const initialValues = {
    name: prefilledGuest?.name || '',
    phone: prefilledGuest?.phone || '',
    address: prefilledGuest?.address || '',
    postalCode: prefilledGuest?.postalCode || '',
    city: prefilledGuest?.city || '',
    rememberMe: prefilledGuest ? true : false,
  }
  if (isCareEnv) initialValues['resident'] = ''

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
          <Input name="name" label="Name" autoComplete="name" />
          <Box height={4} />
          <Input name="phone" label="Telefon" type="tel" autoComplete="tel" />
          <Box height={4} />
          <Input
            name="address"
            label="Anschrift (Straße und Hausnummer)"
            autoComplete="street-address"
          />
          <Box height={4} />
          <Input
            name="postalCode"
            label="Postleitzahl"
            autoComplete="postal-code"
          />
          <Box height={4} />
          <Input name="city" label="Ort" autoComplete="address-level2" />
          {isCareEnv && (
            <>
              <Box height={4} />
              <Input name="resident" label="Bewohnername" />
            </>
          )}
          {hideRememberMe || (
            <>
              <Box height={3} />
              <Checkbox
                name="rememberMe"
                label="Daten auf meinem Handy speichern"
              />
            </>
          )}
          <Box height={5} />
          <Button
            type="submit"
            css={{ width: '100%' }}
            left={<ArrowsRight color="green" />}
            right={<ArrowsLeft color="green" />}
          >
            {submitButtonValue}
          </Button>
          {onAbort && (
            <>
              <Box height={3} />
              <Button css={{ width: '100%' }} onClick={onAbort}>
                Abbrechen
              </Button>
            </>
          )}
          <Box height={6} />
          <Text variant="fineprint">
            Mit dem betätigen des Buttons erkläre ich mich einverstanden, dass
            meine Daten zur Erfüllung der Verpflichtung der Hygiene- und
            Infektionsschutzstandards für 4 Wochen gespeichert werden.
          </Text>
        </Form>
      </Formik>
    </div>
  )
}
