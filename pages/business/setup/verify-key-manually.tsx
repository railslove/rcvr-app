import * as React from 'react'
import Head from 'next/head'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'

import { base64ToHex } from '~lib/crypto'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { Text, Box, Button, ButtonLink, Row, Input } from '~ui/core'
import { ArrowsRight, ArrowsLeft } from '~ui/anicons'
import { KeyPaper } from '~ui/svg'
import { MobileApp } from '~ui/layouts/MobileApp'
import { commitSetupPublicKey } from '~lib/actions'
import { useQueryClient } from 'react-query'
import useLocale from '~locales/useLocale'

const VerifyKeyPage: React.FC<WithOwnerProps> = ({ owner }) => {
  const { t } = useLocale('business/setup/verify-key-manually')
  const router = useRouter()
  const queryClient = useQueryClient()

  const handleCheck = React.useCallback(
    async ({ privateKey }, bag) => {
      const normalizedKey = privateKey.toUpperCase().replace(/\s/g, '')
      if (normalizedKey !== base64ToHex(owner.privateKey)) {
        bag.setFieldError('privateKey', t('privateKeyFieldError'))
      } else {
        await commitSetupPublicKey(queryClient, owner)
        router
          .replace('/business/setup/finished')
          .then(() => window.scrollTo(0, 0))
      }
    },
    [router, owner, queryClient, t]
  )

  return (
    <MobileApp>
      <Head>
        <title key="title">{t('pageTitle')} | recover</title>
      </Head>
      <Text as="h2" variant="h2">
        {t('headline')}
      </Text>
      <Box height={6} />
      <Row justifyContent="center">
        <KeyPaper />
      </Row>
      <Box height={6} />
      <Text>{t('giveKeyMessage')}</Text>
      <Box height={4} />
      <Text>
        {t('reminderMessage1')}{' '}
        <strong>
          {base64ToHex(owner.setupPublicKey).length}{' '}
          {t('reminderMessage2Characters')}
        </strong>{' '}
        {t('reminderMessage3')} <strong>{t('reminderMessage4Numbers')}</strong>{' '}
        {t('reminderMessage5')}{' '}
        <strong>{t('reminderMessage6Characters')}</strong>.
      </Text>
      <Box height={6} />

      <Formik initialValues={{ privateKey: '' }} onSubmit={handleCheck}>
        <Form>
          <Input
            name="privateKey"
            label={t('privateKeyInputLabel')}
            multiline
          />
          <Box height={6} />
          <Button
            right={<ArrowsRight color="green" />}
            type="submit"
            css={{ width: '100%' }}
          >
            {t('testKeyButtonText')}
          </Button>
        </Form>
      </Formik>
      <Box height={8} />
      <Text>{t('reviewKeyReminder')}</Text>
      <Box height={4} />
      <ButtonLink
        href="/business/setup/keys"
        left={<ArrowsLeft color="bluegrey.300" />}
      >
        {t('backLinkText')}
      </ButtonLink>
    </MobileApp>
  )
}

export default withOwner()(VerifyKeyPage)
