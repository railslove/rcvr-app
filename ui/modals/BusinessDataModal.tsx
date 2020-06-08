import * as React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { queryCache } from 'react-query'

import { patchCompany, postCompany } from '~lib/api'
import { Box, Input, Button } from '~ui/core'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'

interface Props {
  type: 'new' | 'edit'
  name?: string
  menuLink?: string
  companyId?: string
}
type MProps = ModalBaseProps & Props

const BusinessSchema = Yup.object().shape({
  name: Yup.string().required('Du musst einen Namen angeben.'),
  menuLink: Yup.string(),
})

export const BusinessDataModal: React.FC<MProps> = ({
  type = 'new',
  name,
  menuLink,
  companyId,
  ...baseProps
}) => {
  const title = { new: 'Neuer Betrieb', edit: 'Betrieb ändern' }[type]
  const button = { new: 'Hinzufügen', edit: 'Speichern' }[type]
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = React.useCallback(
    async ({ name, menuLink, menuPdf }, bag) => {
      let safeMenuLink = menuLink
      if (menuLink && !menuLink.startsWith('http')) {
        safeMenuLink = 'https://' + menuLink
      }

      debugger

      const formData = new FormData()

      formData.append('company[name]', name)
      formData.append('company[menu_link]', menuLink)
      formData.append('company[menu_pdf]', menuPdf)

      try {
        setLoading(true)
        if (type === 'edit') {
          await patchCompany(companyId, formData)
        }
        if (type === 'new') {
          await postCompany({ name, menuLink: safeMenuLink })
        }
        queryCache.refetchQueries('companies')
        baseProps.onClose()
      } catch (error) {
        bag.setFieldError(
          'name',
          'Es ist zu einem Fehler gekommen: ' + error.toString()
        )
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    [type, companyId, baseProps]
  )

  return (
    <ModalBase {...baseProps} maxWidth={400} loading={loading} title={title}>
      <Formik
        initialValues={{
          name: name || '',
          menuLink: menuLink || '',
          menuPdf: '',
        }}
        validationSchema={BusinessSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Input name="name" label="Name des Betriebs" autoFocus />
          <Box height={4} />
          <Input name="menuLink" label="Link zur Speisekarte" />
          <Box height={4} />
          <Field name="menuPdf">
            {({ field, form }) => (
              <Input
                {...field}
                type="file"
                label="Speisekarte als PDF"
                onChange={(event) => {
                  debugger
                  form.setFieldValue('menuPdf', event.currentTarget.files[0])
                }}
              />
            )}
          </Field>
          <Box height={4} />
          <Button type="submit" css={{ width: '100%' }}>
            {button}
          </Button>
        </Form>
      </Formik>
    </ModalBase>
  )
}
