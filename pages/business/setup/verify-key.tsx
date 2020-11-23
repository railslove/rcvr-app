import * as React from 'react'
import Head from 'next/head'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import * as Yup from 'yup'

import { isFormal } from '~lib/config'
import { base64ToHex } from '~lib/crypto'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { Text, Box, Button, Row, FileInput, Card } from '~ui/core'
import { ArrowsRight } from '~ui/anicons'
import { KeyIcon } from '~ui/svg'
import { MobileApp } from '~ui/layouts/MobileApp'

import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import { getOwner, Owner } from '~lib/db'
import * as api from '~lib/api'
import { KeyViewer } from '~ui/blocks/KeyViewer'
import { downloadKey } from '~lib/actions/downloadKey'
import { verifyPrivateKeyExplanation } from '~ui/whitelabels'
import { readTextFile } from '~lib/file'

const getCurrentOwner = async (): Promise<Owner> => {
  const ownerRes = await api.getOwner()
  const owner = await getOwner(ownerRes.id)
  return owner
}

const VerifyKeySchema = Yup.object().shape({
  privateKey: Yup.mixed().test(
    'validKey',
    'Schlüsseldatei stimmt nicht überein.',
    async (value) => {
      if (value) {
        const [owner, key]: [Owner, string] = await Promise.all([
          getCurrentOwner(),
          readTextFile(value),
        ])
        return base64ToHex(owner.privateKey) === key
      }
      return false
    }
  ),
})

const VerifyKeyPage: React.FC<WithOwnerProps> = ({ owner }) => {
  const router = useRouter()

  const handleSubmit = () => {
    router.push('/business/setup/finished')
  }

  return (
    <MobileApp>
      <ScreenView>
        <Head>
          <title key="title">
            {isFormal ? 'Ihr' : 'Dein'} Schlüssel | recover
          </title>
        </Head>
        <Text as="h3" variant="h3">
          Account erstellen (3/3)
        </Text>
        <Box height={4} />
        <Row justifyContent="center">
          <KeyIcon />
        </Row>
        <Box height={6} />
        <Card variant="form" mx={-4}>
          <Text as="h2" variant="h2">
            3. Schlüssel bestätigen
          </Text>
          <Box height={6} />
          {verifyPrivateKeyExplanation}
          <Formik
            initialValues={{ privateKey: '' }}
            onSubmit={handleSubmit}
            validationSchema={VerifyKeySchema}
          >
            {() => (
              <Form>
                <FileInput
                  name="privateKey"
                  type="file"
                  label="Hier die Schlüsseldatei einfügen"
                  hint="Falls Sie die Datei nicht haben, können Sie sie unten herunterladen."
                  accept="text/plain"
                />
                <Box height={4} />
                <Text>
                  Nun erstellen Sie bitte eine Sicherheitskopie, indem Sie die
                  Schlüssel-Datei ausdrucken, auf einen USB-Stick übertragen
                  oder den Inhalt in einem Passwortmanager speichern.
                </Text>
                <Box height={6} />
                <SubActionButton onClick={window.print}>
                  Schlüssel drucken
                </SubActionButton>
                <Box height={4} />
                <SubActionButton onClick={() => downloadKey(owner.privateKey)}>
                  Schlüssel noch mal herunterladen
                </SubActionButton>

                <Box height={8} />
                <Text>
                  {isFormal
                    ? 'Schlüssel sicher und zugänglich verwahrt? Dann können sie jetzt ihren Betrieb einrichten.'
                    : 'Du kannst auch nochmal zurück gehen und den Schlüssel erneut sehen.'}{' '}
                </Text>
                <Box height={4} />
                <Button
                  type="submit"
                  right={<ArrowsRight color="green" />}
                  css={{ width: '100%' }}
                >
                  weiter
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </ScreenView>
      {owner.privateKey && (
        <PrintView>
          <Text>
            <p>
              <strong>
                Sie werden diesen Schlüssel wieder brauchen, wenn das
                Gesundheitsamt anruft.
              </strong>
            </p>
            <p>
              Bitte bewahren sie diesen Schlüssel an einem sicheren, aber für
              sie gut zugänglichen Ort auf.
            </p>
          </Text>
          <Box height={8} />
          <KeyViewer value={owner.privateKey} />
        </PrintView>
      )}
    </MobileApp>
  )
}

const PrintView = styled('div')`
  display: none;
  @media print {
    display: block;
  }
`

const ScreenView = styled('div')`
  display: block;
  @media print {
    display: none;
  }
`

const SubActionButton = styled(Button)(
  css({
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
  })
)

export default withOwner()(VerifyKeyPage)
