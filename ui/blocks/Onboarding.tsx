import * as React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useCurrentGuest } from '@lib/hooks/useCurrentGuest'
import { Guest } from '@lib/db'
import { Input, Checkbox, Button, Box, Text, Card } from '@ui/core'
import { GuestApp } from '@ui/layouts/GuestApp'
import { ArrowsRight, ArrowsLeft } from '@ui/anicons/Arrows'

type OnboardingProps = {
  onSubmit: (guest: Guest, options: { rememberMe: boolean }) => void
}

const OnboardingSchema = Yup.object().shape({
  name: Yup.string().required('Name muss angegeben werden.'),
  phone: Yup.string().required('Telefonnummer muss angegeben werden.'),
  address: Yup.string().required('Adresse muss angegeben werden.'),
  rememberMe: Yup.boolean(),
})

const Onboarding: React.FC<OnboardingProps> = ({ onSubmit }) => {
  const { data: guest } = useCurrentGuest()

  const initialValues = {
    name: guest?.name || '',
    phone: guest?.phone || '',
    address: guest?.address || '',
    rememberMe: guest ? true : false,
  }

  return (
    <GuestApp>
      <Text as="h2" variant="h2">
        Willkommen!
      </Text>
      <Box height={5} />
      <Text>
        <p>
          Durch die aktuellen Corona-Verordnungen musst Du Deine Kontaktdaten
          hinterlegen, wenn Du in einem Gastronomiebetrieb bist.
        </p>
        <p>So kann das Gesundheitsamt Dich anrufen, wenn es notwendig ist.</p>
        <p>
          Datenschutz ist uns dabei sehr wichtig! <strong>recover</strong>{' '}
          speichert Deine Daten verschlüsselt und sicher.
        </p>
      </Text>
      <Box height={6} />
      <Formik
        initialValues={initialValues}
        validationSchema={OnboardingSchema}
        onSubmit={({ name, phone, address, rememberMe }) => {
          onSubmit({ name, phone, address }, { rememberMe })
        }}
      >
        <Card mx={-4}>
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
            <Box height={3} />
            <Checkbox
              name="rememberMe"
              label="Daten auf meinem Handy speichern"
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
    </GuestApp>
  )
}

export default Onboarding
