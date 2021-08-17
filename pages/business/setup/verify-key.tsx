import * as React from 'react'
import Head from 'next/head'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import * as Yup from 'yup'

import { base64ToHex } from '~lib/crypto'
import { WithOwnerProps, withValidPrivateKey } from '~lib/pageWrappers'
import { Text, Box, Button, Row, FileInput, Card } from '~ui/core'
import { ArrowsRight } from '~ui/anicons'
import { KeyIcon } from '~ui/svg'
import { MobileApp } from '~ui/layouts/MobileApp'

import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import { KeyViewer } from '~ui/blocks/KeyViewer'
import { downloadKey } from '~lib/actions/downloadKey'
import { verifyPrivateKeyExplanation } from '~ui/whitelabels'
import { readTextFile } from '~lib/file'
import { commitSetupPublicKey } from '~lib/actions'
import useLocale from '~locales/useLocale'

const VerifyKeyPage: React.FC<WithOwnerProps> = ({ owner }) => {
  const { t } = useLocale('pages/business/setup/verify-key')
  const router = useRouter()
  const queryClient = useQueryClient()

  const handleSubmit = async () => {
    // user has confirmed the temporary setupPublicKey..
    // extract it and set it as the real publicKey on front- and backend
    await commitSetupPublicKey(queryClient, owner)
    router.push('/business/setup/finished')
  }

  const VerifyKeySchema = React.useMemo(() => {
    return Yup.object().shape({
      privateKey: Yup.mixed().test(
        'validKey',
        t('verifyPrivateKeyError'),
        async (value) => {
          if (value) {
            const key = await readTextFile(value)
            return base64ToHex(owner.privateKey) == key
          }
          return false
        }
      ),
    })
  }, [owner, t])

  const { privateKey } = owner

  return (
    <MobileApp>
      <>
        <ScreenView>
          <Head>
            <title key="title">{t('pageTitle')} | recover</title>
          </Head>
          <Text as="h3" variant="h3">
            {t('createAccountStep')} (3/3)
          </Text>
          <Box height={4} />
          <Row justifyContent="center">
            <KeyIcon />
          </Row>
          <Box height={6} />
          <Card variant="form" mx={-4}>
            <Text as="h2" variant="h2">
              3. {t('headline')}
            </Text>
            <Box height={6} />
            <SubActionButton onClick={() => downloadKey(privateKey)}>
              {t('downloadKeyButtonText')}
            </SubActionButton>
            <Box height={6} />
            {verifyPrivateKeyExplanation}
            <Formik
              initialValues={{ privateKey: undefined }}
              onSubmit={handleSubmit}
              validationSchema={VerifyKeySchema}
            >
              {() => (
                <Form>
                  <FileInput
                    name="privateKey"
                    type="file"
                    label={t('privateKeyInputLabel')}
                    hint={t('privateKeyInputHint')}
                    accept="text/plain"
                  />
                  <Box height={4} />
                  <Text>{t('privateKeyInputMessage')}</Text>
                  <Box height={6} />
                  <SubActionButton onClick={window.print}>
                    {t('privateKeyPrintButton')}
                  </SubActionButton>
                  <Box height={4} />
                  <Text>{t('privateKeySecureQuestion')}</Text>
                  <Box height={4} />
                  <Button
                    type="submit"
                    right={<ArrowsRight color="green" />}
                    css={{ width: '100%' }}
                  >
                    {t('continueButtonText')}
                  </Button>
                </Form>
              )}
            </Formik>
          </Card>
        </ScreenView>
        <PrintView>
          <Text>
            <p>
              <strong>{t('youWillNeedKey1')}</strong>
            </p>
            <p>{t('youWillNeedKey2')}</p>
          </Text>
          <Box height={8} />
          <KeyViewer value={owner.privateKey} />
        </PrintView>
      </>
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

export default withValidPrivateKey()(VerifyKeyPage)
