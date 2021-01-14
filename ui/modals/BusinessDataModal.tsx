import * as React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { queryCache } from 'react-query'

import { patchCompany, postCompany } from '~lib/api'
import { Box, Input, FileInput, Button, Text } from '~ui/core'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'
import { pdfType } from '~ui/whitelabels'

interface Props {
  type: 'new' | 'edit'
  name?: string
  menuLink?: string
  menuPdfLink?: string
  menuAlias?: string
  companyId?: string
  privacyPolicyLink?: string
}
type MProps = ModalBaseProps & Props

const BusinessSchema = Yup.object().shape({
  name: Yup.string().required('Du musst einen Namen angeben.'),
  menuLink: Yup.string(),
  privacyPolicyLink: Yup.string(),
  menuPdf: Yup.mixed().test(
    'isPDF',
    'Es können nur pdf-Dateien hochgeladen werden.',
    (value) => {
      // nothing set
      if (value === undefined) {
        return true
        // an invalid file type has been tried to upload
      } else if (value === null) {
        return false
      } else {
        return true
      }
    }
  ),
})

export const BusinessDataModal: React.FC<MProps> = ({
  type = 'new',
  name,
  menuLink,
  menuPdfLink,
  menuAlias,
  companyId,
  privacyPolicyLink,
  ...baseProps
}) => {
  const title = { new: 'Neuer Betrieb', edit: 'Betrieb ändern' }[type]
  const button = { new: 'Hinzufügen', edit: 'Speichern' }[type]
  const [loading, setLoading] = React.useState(false)

  const safeLink = (link: string) => {
    let safeLink = link
    if (safeLink && !safeLink.startsWith('http')) {
      safeLink = 'https://' + safeLink
    }
    return safeLink
  }

  const handleSubmit = React.useCallback(
    async ({ name, menuLink, menuPdf, privacyPolicyLink }, bag) => {
      const safeMenuLink = safeLink(menuLink)
      const safePrivacyPolicyLink = safeLink(privacyPolicyLink)

      const formData = new FormData()
      formData.append('company[name]', name)
      formData.append('company[menu_link]', safeMenuLink)
      formData.append('company[privacy_policy_link]', safePrivacyPolicyLink)
      if (menuPdf !== menuPdfLink) {
        if (menuPdf === undefined) {
          formData.append('company[remove_menu_pdf]', '1')
        } else {
          formData.append('company[menu_pdf]', menuPdf)
        }
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
          privacyPolicyLink: privacyPolicyLink || '',
          menuPdf: menuPdfLink,
        }}
        validationSchema={BusinessSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Input name="name" label="Name des Betriebs" autoFocus />
          <Box height={4} />
          <Input
            name="privacyPolicyLink"
            label={'Datenschutzerklärung als Link'}
          />
          <Box height={4} />
          {
            <>
              <Input
                name="menuLink"
                label={`${menuAlias || pdfType} als Link`}
              />
              <Box height={4} />
              <Text variant="shy" textAlign="center">
                – oder –
              </Text>
              <Box height={2} />
              <FileInput
                name="menuPdf"
                type="file"
                label={`${menuAlias || pdfType} als PDF`}
                hint="Es können nur pdf-Dateien hochgeladen werden."
                accept="application/pdf"
              />
              <Box height={4} />
            </>
          }
          <Button type="submit" css={{ width: '100%' }}>
            {button}
          </Button>
        </Form>
      </Formik>
    </ModalBase>
  )
}
