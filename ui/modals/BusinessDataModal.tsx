import * as React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { queryCache } from 'react-query'

import { patchCompany, postCompany } from '~lib/api'
import { Box, Input, FileInput, Button } from '~ui/core'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'

interface Props {
  type: 'new' | 'edit'
  name?: string
  menuLink?: string
  menuPdfLink?: string
  companyId?: string
}
type MProps = ModalBaseProps & Props

const BusinessSchema = Yup.object().shape({
  name: Yup.string().required('Du musst einen Namen angeben.'),
  menuLink: Yup.string(),
  menuPdf: Yup.mixed(),
})

export const BusinessDataModal: React.FC<MProps> = ({
  type = 'new',
  name,
  menuLink,
  menuPdfLink,
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

      const formData = new FormData()
      formData.append('company[name]', name)
      formData.append('company[menu_link]', safeMenuLink)
      if (menuPdf !== menuPdfLink) {
        formData.append('company[menu_pdf]', menuPdf)
      }

      try {
        setLoading(true)
        if (type === 'edit') {
          await patchCompany(companyId, formData)
        }
        if (type === 'new') {
          await postCompany(formData)
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
    [type, companyId, baseProps, menuPdfLink]
  )

  return (
    <ModalBase {...baseProps} maxWidth={400} loading={loading} title={title}>
      <Formik
        initialValues={{
          name: name || '',
          menuLink: menuLink || '',
          menuPdf: menuPdfLink,
        }}
        validationSchema={BusinessSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Input name="name" label="Name des Betriebs" autoFocus />
          <Box height={4} />
          <Input name="menuLink" label="Link zur Speisekarte" />
          <Box height={4} />
          <FileInput
            name="menuPdf"
            type="file"
            label="Speisekarte"
            hint="Es können nur pdf-Dateien hochgeladen werden."
          />
          <Box height={4} />
          <Button type="submit" css={{ width: '100%' }}>
            {button}
          </Button>
        </Form>
      </Formik>
    </ModalBase>
  )
}
