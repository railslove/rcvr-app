import * as React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { isCareEnv } from '~lib/config'
import { Guest } from '~lib/db'
import { Input, Checkbox, Button, Box, Text, Card } from '~ui/core'
import { ArrowsRight, ArrowsLeft } from '~ui/anicons'

type OnboardingProps = {
  onSubmit: (guest: Guest) => void
  prefilledGuest: Guest
}

const yupShape = {
  name: Yup.string().required('Name muss angegeben werden.'),
  phone: Yup.string().required('Telefonnummer muss angegeben werden.'),
  address: Yup.string().required('Adresse muss angegeben werden.'),
  wantsAutoCheckin: Yup.boolean(),
}

if (isCareEnv)
  yupShape['resident'] = Yup.string().required(
    'Bewohnername muss angegeben werden.'
  )

const OnboardingSchema = Yup.object().shape(yupShape)

export const Onboarding: React.FC<OnboardingProps> = ({
  onSubmit,
  prefilledGuest,
}) => {
  const initialValues = {
    name: prefilledGuest?.name || '',
    phone: prefilledGuest?.phone || '',
    address: prefilledGuest?.address || '',
    wantsAutoCheckin: prefilledGuest?.wantsAutoCheckin ? true : false,
  }

  if (isCareEnv) initialValues['resident'] = ''

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={OnboardingSchema}
        onSubmit={({ ...fields }) => {
          onSubmit(fields)
        }}
      >
        <Card variant="form" mx={-4}>
          <Form>
            <Input name="name" label="Name" autoComplete="name" />
            <Box height={4} />
            <Input name="phone" label="Telefon" type="tel" autoComplete="tel" />
            <Box height={4} />
            <Input
              name="address"
              label="Anschrift"
              autoComplete="street-address"
            />
            <Box height={4} />
            {isCareEnv && (
              <>
                <Box height={4} />
                <Input name="resident" label="Bewohnername" />
              </>
            )}
            <Box height={3} />
            <Checkbox
              name="wantsAutoCheckin"
              label="Beim nächsten Mal automatisch einchecken"
            />
            <Box height={5} />
            <Button
              type="submit"
              css={{ width: '100%' }}
              left={<ArrowsRight color="green" />}
              right={<ArrowsLeft color="green" />}
            >
              Check in
            </Button>
            <Box height={6} />
            <Text variant="fineprint">
              Mit dem betätigen des Buttons erkläre ich mich einverstanden, dass
              meine Daten zur Erfüllung der Verpflichtung der Hygiene- und
              Infektionsschutzstandards für 4 Wochen gespeichert werden.
            </Text>
          </Form>
        </Card>
      </Formik>
    </div>
  )
}
