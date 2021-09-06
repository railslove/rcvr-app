import * as React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useQueryClient } from 'react-query'
import crypto from 'crypto'

import {
  CompanyRes,
  patchCompany,
  postCompany,
  CoronaTestOptions,
  CompanyTypeOptions,
} from '~lib/api'
import { Box, Input, FileInput, Button, Text, Checkbox, Select } from '~ui/core'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'
import { encrypt } from '~lib/crypto'
import { CurrentOwner } from '~lib/hooks/useOwner'
import * as businessDataModalLocales from '~ui/modals/BusinessDataModal.locales'
import useLocaleObject from '~locales/useLocaleObject'

interface Props {
  type: 'new' | 'edit'
  owner?: CurrentOwner
  company?: CompanyRes
}
export type BusinessDataModalProps = ModalBaseProps & Props

const menuPdfFileName = (company: CompanyRes) =>
  company?.menuPdfLink?.split('/')?.pop()

export const BusinessDataModal: React.FC<BusinessDataModalProps> = ({
  type = 'new',
  owner,
  company,
  ...baseProps
}) => {
  const { t } = useLocaleObject(businessDataModalLocales)

  const queryClient = useQueryClient()
  const title = { new: t('titleNew'), edit: t('titleEdit') }[type]
  const button = { new: t('buttonNew'), edit: t('buttonEdit') }[type]
  const [loading, setLoading] = React.useState(false)

  const companyTypeSelectOptions: typeof CompanyTypeOptions = {
    craft: t('craft'),
    other: t('other'),
    retail: t('retail'),
    workplace: t('workplace'),
    food_service: t('food_service'),
    public_building: t('public_building'),
    educational_institution: t('educational_institution'),
  }

  const coronaTestSelectOptions: typeof CoronaTestOptions = {
    '0': t('coronaTestSelectOptions0'),
    '24': t('coronaTestSelectOptions24'),
    '48': t('coronaTestSelectOptions48'),
  }

  const BusinessSchema = Yup.object().shape({
    zip: Yup.string().required(t('zipRequired')),
    name: Yup.string().required(t('nameRequired')),
    city: Yup.string().required(t('cityRequired')),
    street: Yup.string().required(t('streetRequired')),
    needToShowCoronaTest: Yup.number(),
    menuLink: Yup.string(),
    menuAlias: Yup.string(),
    privacyPolicyLink: Yup.string(),
    menuPdf: Yup.mixed().test('isPDF', t('menuPDFRequired'), (value) => {
      // nothing set
      if (value === undefined) {
        return true
        // an invalid file type has been tried to upload
      } else if (value === null) {
        return false
      } else {
        return true
      }
    }),
  })

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
    [type, baseProps, company, queryClient, owner?.publicKey]
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
          <Input name="zip" label={t('zipLabel')} autoComplete="postal-code" />
          <Box height={4} />
          <Input
            name="city"
            label={t('cityLabel')}
            autoComplete="address-level2"
          />
          <Box height={4} />
          <Select
            name="locationType"
            label={t('companyTypeLabel')}
            options={companyTypeSelectOptions}
          />
          <Box height={4} />
          <Select
            name="needToShowCoronaTest"
            label={t('needShowCoronaTestLabel')}
            options={coronaTestSelectOptions}
          />
          <Checkbox
            name="cwaLinkEnabled"
            label={t('checkInWithCWALabel')}
            hint={t('checkInWithCWAHint')}
            hintEnabled={t('checkInWithCWAHintEnabled')}
          />
          <Box height={1} />
          <Input name="privacyPolicyLink" label={t('privacyPolicyLabel')} />
          <Box height={4} />
          <Input name="menuAlias" label={t('menuAliasLabel')} />
          <Box height={4} />
          <Input name="menuLink" label={t('menuLinkLabel')} />
          <Box height={4} />
          <Text variant="shy" textAlign="center">
            – {t('or')} –
          </Text>
          <Box height={2} />
          <FileInput
            name="menuPdf"
            type="file"
            label={t('menuFileLabel')}
            hint={t('menuFileHint')}
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
