import * as React from 'react'
import Head from 'next/head'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import * as Yup from 'yup'

import { isFormal } from '~lib/config'
import { base64ToHex } from '~lib/crypto'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { Text, Box, Button, ButtonLink, Row, Input, FileInput } from '~ui/core'
import { ArrowsRight, ArrowsLeft } from '~ui/anicons'
import { Step4 } from '~ui/svg'
import { MobileApp } from '~ui/layouts/MobileApp'
import { AutoDataRequestModal } from '~ui/modals/AutoDataRequestModal'

import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import { getOwner } from '~lib/db'
import * as api from '~lib/api'
import { height } from 'styled-system'
import { KeyViewer } from '~ui/blocks/KeyViewer'
import { downloadKey } from '~lib/actions/downloadKey'
import { verifyPrivateKeyExplanation } from '~lib/contentBasedOnEnv'
import { readTextFile } from '~lib/file'

const getCurrentOwner = async () => {
  let ownerRes = await api.getOwner()
  let owner = await getOwner(ownerRes.id)
  return owner
}

const VerifyKeySchema = Yup.object().shape({
  privateKey: Yup.mixed().test(
    'validKey',
    'Schlüsseldatei stimmt nicht überein.',
    async (value) => {
      if (value) {
        const [owner, key] = await Promise.all([
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
        <Text as="h2" variant="h2">
          Schlüssel bestätigen
        </Text>
        <Box height={6} />
        <Row justifyContent="center">
          <Step4 />
        </Row>
        <Box height={6} />
        {verifyPrivateKeyExplanation}
        <Formik
          initialValues={{ privateKey: '' }}
          onSubmit={handleSubmit}
          validationSchema={VerifyKeySchema}
        >
          {({ errors, touched }) => (
            <Form>
              <FileInput
                name="privateKey"
                type="file"
                label="Hier die Schlüsseldatei hochladen"
                hint="Falls sie die Datei nicht haben, können sie sie unten herunterladen."
                accept="text/plain"
              />
              <Box height={4} />
              <Text>
                Nun erstellen sie bitte eine Sicherheitskopie, indem sie die
                Schlüssel-Datei ausdrucken, auf einen USB-Stick übertragen oder
                den Inhalt in einem Passwortmanager speichern.
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
      </ScreenView>
      {
        owner.privateKey && (
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
        )
      }
    </MobileApp >
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
