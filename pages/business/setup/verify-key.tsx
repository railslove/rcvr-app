import * as React from 'react'
import Head from 'next/head'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'

import { isFormal } from '~lib/config'
import { base64ToHex } from '~lib/crypto'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { Text, Box, Button, ButtonLink, Row, Input, FileInput } from '~ui/core'
import { ArrowsRight, ArrowsLeft } from '~ui/anicons'
import { Step4 } from '~ui/svg'
import { MobileApp } from '~ui/layouts/MobileApp'

const VerifyKeyPage: React.FC<WithOwnerProps> = ({ owner }) => {
  const router = useRouter()

  const handleCheck = React.useCallback(
    ({ privateKey }, bag) => {
      const normalizedKey = privateKey.toUpperCase().replace(/\s/g, '')
      if (normalizedKey !== base64ToHex(owner.privateKey)) {
        bag.setFieldError(
          'privateKey',
          'Der Schlüssel stimmt nicht. Überprüfe ihn nochmals. Leerzeichen und Groß- und Kleinschreibung spielen keine Rolle.'
        )
      } else {
        router
          .replace('/business/setup/finished')
          .then(() => window.scrollTo(0, 0))
      }
    },
    [router, owner.privateKey]
  )

  return (
    <MobileApp>
      <Head>
        <title key="title">
          {isFormal ? 'Ihr' : 'Dein'} Schlüssel | recover
        </title>
      </Head>
      <Text as="h2" variant="h2">
        Schlüssel bestätigen
      </Text>
      <Box height={6} />
      <Row justifyContent="center">
        <Step4 />
      </Row>
      <Box height={6} />
      <Text>
        {isFormal ? (
          <>
            <strong>
              Sie werden die Datei geheimer_schluessel.txt wieder brauchen, wenn
              das Gesundheitsamt anruft.
            </strong>
            <br />
            Laden sie sie deshalb hier zur Bestätigung noch einmal hoch.
          </>
        ) : (
          'Gib den Schlüssel nun erneut ein. Damit gehen wir sicher, dass Du ihn korrekt notiert hast.'
        )}
      </Text>
      <Formik initialValues={{ privateKey: '' }} onSubmit={handleCheck}>
        <Form>
          <FileInput
            name="privateKey"
            type="file"
            label="Hier die Dateie geheimer-schluessel.txt hochladen"
            hint="Falls sie die Datei nicht haben, Pech."
            accept="text/plain"
          />
        </Form>
      </Formik>
      <Box height={4} />
      <Text>
        Nun erstellen sie bitte eine Sicherheitskopie, indem sie die
        Schlüssel-Datei ausdrucken, auf einen USB-Stick übertragen oder den
        Inhalt in einem Passwortmanager speichern.
      </Text>
      <Box height={6} />
      <Button type="submit" css={{ width: '100%' }}>
        Schlüssel drucken
      </Button>
      <Box height={4} />
      <Button type="submit" css={{ width: '100%' }}>
        Schlüssel noch mal herunterladen
      </Button>

      <Box height={8} />
      <Text>
        {isFormal
          ? 'Schlüssel sicher und zugänglich verwahrt? Dann können sie jetzt ihren Betrieb einrichten.'
          : 'Du kannst auch nochmal zurück gehen und den Schlüssel erneut sehen.'}{' '}
      </Text>
      <Box height={4} />
      <ButtonLink
        href="/business/setup/keys"
        right={<ArrowsRight color="green" />}
      >
        weiter
      </ButtonLink>
    </MobileApp>
  )
}

export default withOwner()(VerifyKeyPage)
