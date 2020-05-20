import * as React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useCurrentGuest } from '@lib/hooks/useCurrentGuest'
import { Guest } from '@lib/db'
import { Input, Checkbox } from '@ui/core'

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
    name: guest.name || '',
    phone: guest.phone || '',
    address: guest.address || '',
    rememberMe: guest ? true : false,
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={OnboardingSchema}
      onSubmit={({ name, phone, address, rememberMe }) => {
        onSubmit({ name, phone, address }, { rememberMe })
      }}
    >
      <Form>
        <Input name="name" label="Name" autoComplete="name" />
        <Input name="phone" label="Telefon" type="tel" autoComplete="tel" />
        <Input name="address" label="Anschrift" autoComplete="street-address" />
        <Checkbox name="rememberMe" label="Daten auf meinem Handy speichern" />
        <button type="submit">CHECK IN</button>
      </Form>
    </Formik>
  )
}

export default Onboarding
