import * as React from 'react'
import * as Yup from 'yup'
import { queryCache } from 'react-query'
import { Form, Formik } from 'formik'
import { OwnerRes, patchOwner } from '~lib/api'
import { isFormal } from '~lib/config'
import { ArrowsLeft, ArrowsRight } from '~ui/anicons'
import { Box, Button, Input } from '~ui/core'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'

type OwnerFormProps = {
  owner: OwnerRes
}
type MProps = ModalBaseProps & OwnerFormProps

const yupShape = {
  name: Yup.string().required('Name muss angegeben werden.'),
  phone: Yup.string().required('Telefonnummer muss angegeben werden.'),
  street: Yup.string().required('Strasse muss angegeben werden.'),
  zip: Yup.string().required('Postleitzahl muss angegeben werden.'),
  city: Yup.string().required('Ort muss angegeben werden.'),
  companyName: Yup.string().required('Unternehmensname muss angegeben werden.'),
}

const OwnerSchema = Yup.object().shape(yupShape)

export const OwnerModal: React.FC<MProps> = ({ owner, ...baseProps }) => {
  const initialValues = {
    name: owner?.name || '',
    phone: owner?.phone || '',
    street: owner?.street || '',
    zip: owner?.zip || '',
    city: owner?.city || '',
    companyName: owner?.companyName || '',
  }
  const [loading, setLoading] = React.useState(false)

  return (
    <ModalBase
      {...baseProps}
      maxWidth={400}
      loading={loading}
      title="Profil bearbeiten"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={OwnerSchema}
        onSubmit={async (fields) => {
          setLoading(true)
          try {
            await patchOwner(fields)
            queryCache.refetchQueries('owner')
            baseProps.onClose()
          } finally {
            setLoading(false)
          }
        }}
      >
        <Form>
          <Input name="name" label={isFormal ? 'Ihr Name' : 'Dein Name'} />
          <Box height={4} />
          <Input
            name="companyName"
            label={
              isFormal ? 'Name Ihres Unternehmens' : 'Name deines Unternehmens'
            }
          />
          <Box height={4} />
          <Input
            name="phone"
            label={isFormal ? 'Ihre Telefonnummer' : 'Deine Telefonnummer'}
            type="tel"
            autoComplete="tel"
          />
          <Box height={4} />
          <Input
            name="street"
            label={'Strasse und Hausnummer'}
            autoComplete="street-address"
          />
          <Box height={4} />
          <Input name="zip" label={'Postleitzahl'} autoComplete="postal-code" />
          <Box height={4} />
          <Input name="city" label={'Ort'} autoComplete="address-level2" />
          <Box height={5} />
          <Button
            type="submit"
            left={<ArrowsRight color="green" />}
            right={<ArrowsLeft color="green" />}
          >
            Speichern
          </Button>
        </Form>
      </Formik>
    </ModalBase>
  )
}
