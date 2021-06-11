import { Form, Formik } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'
import { AreaRes } from '~lib/api'
import { isCareEnv, isFormal } from '~lib/config'
import { Guest, GuestHealthDocumentEnum } from '~lib/db'
import { phoneValidator } from '~lib/validators/phoneValidator'
import { ArrowsLeft, ArrowsRight } from '~ui/anicons'
import { Box, Button, Checkbox, Radio, Input, Text } from '~ui/core'

type OnboardingProps = {
  onSubmit: (guest: Guest, options: { rememberMe: boolean }) => void
  prefilledGuest?: Guest
  area: AreaRes
  hideRememberMe?: boolean
  onAbort?: () => void
  submitButtonValue?: string
}

export const Onboarding: React.FC<OnboardingProps> = ({
  area,
  onSubmit,
  prefilledGuest,
  hideRememberMe,
  onAbort,
  submitButtonValue = 'Check in',
}) => {
  const initialValues = {
    name: prefilledGuest?.name || '',
    phone: prefilledGuest?.phone || '',
    address: prefilledGuest?.address || '',
    postalCode: prefilledGuest?.postalCode || '',
    city: prefilledGuest?.city || '',
    rememberMe: prefilledGuest ? true : false,
    providedHealthDocument: prefilledGuest?.providedHealthDocument,
  }
  if (isCareEnv) initialValues['resident'] = ''

  const yupShape = {
    name: Yup.string().required('Name muss angegeben werden.'),
    phone: phoneValidator,
    address: Yup.string().required('Adresse muss angegeben werden.'),
    postalCode: Yup.string().required('Postleitzahl muss angegeben werden.'),
    city: Yup.string().required('Ort muss angegeben werden.'),
    rememberMe: Yup.boolean(),
  }

  if (area.companyNeedToShowCoronaTest)
    yupShape['providedHealthDocument'] = Yup.string().required(
      isFormal
        ? 'Sie müssen entweder getestet, genesen oder geimpft sein.'
        : 'Du musst entweder getestet, genesen oder geimpft sein.'
    )

  if (isCareEnv)
    yupShape['resident'] = Yup.string().required(
      'Bewohnername muss angegeben werden.'
    )

  const OnboardingSchema = Yup.object().shape(yupShape)
  const provide_test_label =
    'Getestet: Ich bestätige ein negatives, nicht länger als ' +
    area.companyNeedToShowCoronaTest +
    ' Stunden zurückliegendes, Testergebnis vorliegen zu haben und dieses im Prüffall vorweisen zu können.'

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={OnboardingSchema}
        onSubmit={({ rememberMe, ...fields }) => {
          onSubmit(fields, { rememberMe })
        }}
      >
        <Form>
          <Input name="name" label="Name" autoComplete="name" />
          <Box height={4} />
          <Input name="phone" label="Telefon" type="tel" autoComplete="tel" />
          <Box height={4} />
          <Input
            name="address"
            label="Anschrift (Straße und Hausnummer)"
            autoComplete="street-address"
          />
          <Box height={4} />
          <Input
            name="postalCode"
            label="Postleitzahl"
            autoComplete="postal-code"
          />
          <Box height={4} />
          <Input name="city" label="Ort" autoComplete="address-level2" />
          {isCareEnv && (
            <>
              <Box height={4} />
              <Input name="resident" label="Bewohnername" />
            </>
          )}
          {area.companyNeedToShowCoronaTest > 0 && area.testExemption != 't' && (
            <>
              <Box height={3} />
              <Radio
                name="providedHealthDocument"
                label={provide_test_label}
                value={GuestHealthDocumentEnum.tested}
                hideError={true}
              />
              <Radio
                name="providedHealthDocument"
                label="Genesen: Ich bestätige eine Dokumentation über meine Genesung von einer Corona-Erkrankung vorweisen zu können und diese im Prüffall vorweisen zu können."
                value={GuestHealthDocumentEnum.hadCorona}
                hideError={true}
              />
              <Radio
                name="providedHealthDocument"
                label="Geimpft: Ich bestätige eine Dokumentation (Impfpass) über meine Impfung gegen eine Infektion mit dem Coronavirus vorweisen zu können und diese im Prüffall vorweisen zu können."
                value={GuestHealthDocumentEnum.vaccinated}
              />
            </>
          )}
          {hideRememberMe || (
            <>
              <Box height={3} />
              <Checkbox
                name="rememberMe"
                label="Daten auf meinem Handy speichern"
              />
            </>
          )}
          <Box height={5} />
          <Button
            type="submit"
            css={{ width: '100%' }}
            left={<ArrowsRight color="green" />}
            right={<ArrowsLeft color="green" />}
            dataAttributes={{ 'wfd-action': 'check-in' }}
          >
            {submitButtonValue}
          </Button>
          {onAbort && (
            <>
              <Box height={3} />
              <Button css={{ width: '100%' }} onClick={onAbort}>
                Abbrechen
              </Button>
            </>
          )}
          <Box height={6} />
          <Text variant="fineprint">
            Mit dem betätigen des Buttons erkläre ich mich einverstanden, dass
            meine Daten zur Erfüllung der Verpflichtung der Hygiene- und
            Infektionsschutzstandards für 4 Wochen gespeichert werden.
          </Text>
        </Form>
      </Formik>
    </div>
  )
}
