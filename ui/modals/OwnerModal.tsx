import * as React from 'react'
import * as Yup from 'yup'
import { useQueryClient } from 'react-query'
import { Form, Formik } from 'formik'
import { OwnerRes, patchOwner } from '~lib/api'
import { ArrowsLeft, ArrowsRight } from '~ui/anicons'
import { Box, Button, Input } from '~ui/core'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'
import { createPhoneValidator } from '~lib/validators/phoneValidator'
import validatorsLocalesDE from '~lib/validators/validatorsLocales.de'
import { SupportedLanguage } from '~locales/types'

export type OwnerFormProps = {
  lang: SupportedLanguage
  owner: OwnerRes
  locales: Pick<
    typeof validatorsLocalesDE,
    | 'nameLabel'
    | 'nameRequired'
    | 'zipLabel'
    | 'zipRequired'
    | 'cityLabel'
    | 'cityRequired'
    | 'phoneLabel'
    | 'phoneInvalid'
    | 'phoneRequired'
    | 'streetLabel'
    | 'streetRequired'
    | 'companyNameLabel'
    | 'companyNameRequired'
  > & {
    editProfile: string
    submitButton: string
  }
}
type MProps = ModalBaseProps & OwnerFormProps

export const OwnerModal: React.FC<MProps> = ({
  lang,
  owner,
  locales,
  ...baseProps
}) => {
  const initialValues = {
    name: owner?.name || '',
    phone: owner?.phone || '',
    street: owner?.street || '',
    zip: owner?.zip || '',
    city: owner?.city || '',
    companyName: owner?.companyName || '',
  }
  const [loading, setLoading] = React.useState(false)
  const queryClient = useQueryClient()

  const yupShape = {
    name: Yup.string().required(locales.nameRequired),
    phone: createPhoneValidator({
      lang,
      name: 'phone',
      invalid: locales.phoneInvalid,
      required: locales.phoneRequired,
    }),
    street: Yup.string().required(locales.streetRequired),
    zip: Yup.string().required(locales.zipRequired),
    city: Yup.string().required(locales.cityRequired),
    companyName: Yup.string().required(locales.companyNameRequired),
  }

  const OwnerSchema = Yup.object().shape(yupShape)

  return (
    <ModalBase
      {...baseProps}
      maxWidth={400}
      loading={loading}
      title={locales.editProfile}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={OwnerSchema}
        onSubmit={async (fields) => {
          setLoading(true)
          try {
            await patchOwner(fields)
            queryClient.invalidateQueries('owner')
            baseProps.onClose()
          } finally {
            setLoading(false)
          }
        }}
      >
        <Form>
          <Input name="name" label={locales.nameLabel} />
          <Box height={4} />
          <Input name="companyName" label={locales.companyNameLabel} />
          <Box height={4} />
          <Input
            name="phone"
            label={locales.phoneLabel}
            type="tel"
            autoComplete="tel"
          />
          <Box height={4} />
          <Input
            name="street"
            label={locales.streetLabel}
            autoComplete="street-address"
          />
          <Box height={4} />
          <Input
            name="zip"
            label={locales.zipLabel}
            autoComplete="postal-code"
          />
          <Box height={4} />
          <Input
            name="city"
            label={locales.cityLabel}
            autoComplete="address-level2"
          />
          <Box height={5} />
          <Button
            type="submit"
            left={<ArrowsRight color="green" />}
            right={<ArrowsLeft color="green" />}
          >
            {locales.submitButton}
          </Button>
        </Form>
      </Formik>
    </ModalBase>
  )
}
