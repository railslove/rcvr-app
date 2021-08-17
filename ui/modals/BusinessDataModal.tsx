import * as React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useQueryClient } from 'react-query'
import crypto from 'crypto'

import {
  CompanyRes,
  patchCompany,
  postCompany,
  CompanyTypeOptions,
  CoronaTestOptions,
} from '~lib/api'
import { Box, Input, FileInput, Button, Text, Checkbox, Select } from '~ui/core'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'
import { pdfType } from '~ui/whitelabels'
import { encrypt } from '~lib/crypto'
import { CurrentOwner } from '~lib/hooks/useOwner'

interface Props {
  type: 'new' | 'edit'
  company?: CompanyRes
  owner?: CurrentOwner
}
type MProps = ModalBaseProps & Props

const menuPdfFileName = (company: CompanyRes) =>
  company?.menuPdfLink?.split('/')?.pop()

const BusinessSchema = Yup.object().shape({
  name: Yup.string().required('Du musst einen Namen angeben.'),
  street: Yup.string().required('Strasse muss angegeben werden.'),
  zip: Yup.string().required('Postleitzahl muss angegeben werden.'),
  city: Yup.string().required('Ort muss angegeben werden.'),
  needToShowCoronaTest: Yup.number(),
  menuLink: Yup.string(),
  menuAlias: Yup.string(),
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
  owner,
  company,
  ...baseProps
}) => {
  const queryClient = useQueryClient()
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
    async (
      {
        name,
        street,
        zip,
        city,
        needToShowCoronaTest,
        menuLink,
        menuAlias,
        menuPdf,
        privacyPolicyLink,
        cwaLinkEnabled,
        locationType,
      },
      bag
    ) => {
      const safeMenuLink = safeLink(menuLink)
      const safePrivacyPolicyLink = safeLink(privacyPolicyLink)

      const formData = new FormData()
      formData.append('company[name]', name)
      formData.append('company[street]', street)
      formData.append('company[zip]', zip)
      formData.append('company[city]', city)
      formData.append('company[need_to_show_corona_test]', needToShowCoronaTest)
      formData.append('company[menu_link]', safeMenuLink)
      formData.append('company[menu_alias]', menuAlias)
      formData.append('company[privacy_policy_link]', safePrivacyPolicyLink)
      formData.append('company[cwa_link_enabled]', cwaLinkEnabled)
      if (!company?.cwaCryptoSeed) {
        const randomBytes = btoa(
          String.fromCharCode.apply(null, crypto.randomBytes(16))
        )
        const encrypted = encrypt(owner.publicKey, randomBytes)
        formData.append('company[cwa_crypto_seed]', encrypted)
      }
      formData.append('company[location_type]', locationType)

      if (menuPdf !== menuPdfFileName(company)) {
        if (menuPdf === undefined || menuPdf === null || menuPdf == '') {
          formData.append('company[remove_menu_pdf]', '1')
        } else {
          formData.append('company[menu_pdf]', menuPdf)
        }
      }

      try {
        setLoading(true)
        if (type === 'edit') {
          await patchCompany(company.id, formData)
        }
        if (type === 'new') {
          await postCompany(formData)
        }
        queryClient.invalidateQueries('companies')
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
    [type, baseProps, company, queryClient, owner.publicKey]
  )

  const prefilledWithWhenNew = (value, prefilledValue) => {
    if (type === 'edit') {
      return value || ''
    }
    return value || prefilledValue || ''
  }

  return (
    <ModalBase {...baseProps} maxWidth={400} loading={loading} title={title}>
      <Formik
        initialValues={{
          name: company?.name || '',
          street: prefilledWithWhenNew(company?.street, owner?.street),
          zip: prefilledWithWhenNew(company?.zip, owner?.zip),
          city: prefilledWithWhenNew(company?.city, owner?.city),
          menuAlias: company?.menuAlias || '',
          menuLink: company?.menuLink || '',
          privacyPolicyLink: company?.privacyPolicyLink || '',
          needToShowCoronaTest: company?.needToShowCoronaTest || 0,
          menuPdf: menuPdfFileName(company),
          locationType: company?.locationType || 'other',
          cwaLinkEnabled: company?.cwaLinkEnabled || false,
        }}
        validationSchema={BusinessSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Input name="name" label="Name des Betriebs" autoFocus />
          <Box height={4} />
          <Input
            name="street"
            label="Strasse und Hausnummer"
            autoComplete="street-address"
          />
          <Box height={4} />
          <Input name="zip" label="Postleitzahl" autoComplete="postal-code" />
          <Box height={4} />
          <Input name="city" label="Ort" autoComplete="address-level2" />
          <Box height={4} />
          <Select
            name="locationType"
            label="Art des Betriebes"
            options={CompanyTypeOptions}
          />
          <Box height={4} />
          <Select
            name="needToShowCoronaTest"
            label="Gäste müssen einen negative Corona-Test oder einen Nachweis zur Impfung oder Genesung vorzeigen"
            options={CoronaTestOptions}
          />
          <Checkbox
            name="cwaLinkEnabled"
            label="Checkin mit der Corona-Warn-App anbieten"
            hint="Biete deinen Gästen einen zusätzlichen Checkin mit der Corona-Warn-App an. So werden sie noch schneller über Risikobegegnungen informiert. Die QR-Codes müssen nach der Aktivierung neu ausgedruckt werden."
            hintEnabled="Deine Gäste können nun nach dem Checkin mit recover ganz einfach zusätzlich mit der Corona-Warn-App einchecken."
          />
          <Box height={1} />
          <Input
            name="privacyPolicyLink"
            label={'Datenschutzerklärung als Link'}
          />
          <Box height={4} />
          <Input
            name="menuAlias"
            label={'Name der Zustatzinformationen-Sektion'}
          />
          <Box height={4} />
          <Input name="menuLink" label={`${pdfType} als Link`} />
          <Box height={4} />
          <Text variant="shy" textAlign="center">
            – oder –
          </Text>
          <Box height={2} />
          <FileInput
            name="menuPdf"
            type="file"
            label={`${pdfType} als PDF`}
            hint="Es können nur pdf-Dateien hochgeladen werden."
            accept="application/pdf"
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
