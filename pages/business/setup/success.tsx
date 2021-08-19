import Head from 'next/head'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useQueryClient } from 'react-query'
import { updateOwner } from '~lib/actions'
import { generateKeys } from '~lib/crypto'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import usePageLocale from '~locales/usePageLocale'
import { ArrowsRight } from '~ui/anicons'
import { Box, Button, Card, Row, Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'
import { Warning, KeyPaper } from '~ui/svg'
import { BUILD_VARIANT } from '~ui/whitelabels'

const ContactInformation = () => {
  const { t } = usePageLocale<'business/setup/success'>()

  switch (BUILD_VARIANT) {
    case 'care': {
      return (
        <p>
          {t('contactInformation_care1')}:{'  '}
          <a href={t('contactInformationBSFLink')}>
            {t('contactInformationBSFLinkText')}
          </a>
        </p>
      )
    }
    case 'health': {
      return (
        <p>
          {t('contactInformation_health1')}:{'  '}
          <a href="tel:022197356159">{t('contactInformationBSFLinkText')}</a>
        </p>
      )
    }
    default: {
      return null
    }
  }
}

const PrivateKeyExplanation: React.FC = () => {
  const { t } = usePageLocale<'business/setup/success'>()

  switch (BUILD_VARIANT) {
    case 'care':
    case 'health': {
      return (
        <>
          <p>
            <strong>{t('privateKeyNextStep')}: </strong>
            <br />
            {t('privateKey_careHealth1')}
            <br />
            {t('privateKey_careHealth2')}
          </p>
          <Box height={4} />
          <div>
            <Warning />
          </div>
          <Box height={4} />
          <p>
            <strong>{t('privateKey_careHealth3')}</strong>
          </p>
        </>
      )
    }
    case 'fresenius': {
      return (
        <>
          <p>
            {t('privateKey_freesenius1')}
            <span role="img" aria-label="Hurra!">
              🎉
            </span>
          </p>
          <p>{t('privateKey_freesenius2')}</p>
          <p>
            <strong>{t('privateKeyNextStep')}: </strong>
            <br />
            {t('privateKey_freesenius3')}
          </p>
          <p>
            <strong>{t('privateKey_freesenius4')}</strong>
          </p>
          <p>
            <strong>{t('privateKey_freesenius5')}</strong>
          </p>
        </>
      )
    }
    default: {
      return (
        <>
          <p>
            {t('privateKey1')}
            <span role="img" aria-label="Hurra!">
              🎉
            </span>
          </p>
          <p>{t('privateKey2')}</p>
          <p>
            <strong>{t('privateKeyNextStep')}: </strong>
            <br />
            {t('privateKey3')}
            <br />
            {t('privateKey4')}
          </p>
          <Box height={4} />
          <div>
            <Warning />
          </div>
          <Box height={4} />
          <p>
            <strong>{t('privateKey5')}</strong>
          </p>
        </>
      )
    }
  }
}

const SetupSuccessPage: React.FC<WithOwnerProps> = ({ owner }) => {
  const { t } = usePageLocale<'business/setup/success'>()
  const router = useRouter()
  const queryClient = useQueryClient()

  const generateKey = async (redirectTarget: string) => {
    if (!owner) return

    let { publicKey, privateKey } = owner
    if (!publicKey || !privateKey) {
      const keys = generateKeys()
      privateKey = keys.privateKey
      publicKey = keys.publicKey

      // the backend will receive the publicKey when the onboarding
      // process has been done completely.
      // meanwhile we store it in the frontend as setupPublicKey.
      // so when a user freshly logs in (or reloads or whatever)
      // and doesn't have a public_key assigned in the backend
      // the frontend needs to restart the onboarding process!
      await updateOwner(queryClient, {
        ...owner,
        privateKey,
        setupPublicKey: publicKey,
      })
    }
    router.push(redirectTarget)
  }

  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">{t('title')} | recover</title>
      </Head>
      <Text as="h3" variant="h3">
        {t('title')} (2/3)
      </Text>
      <Box height={6} />
      <Row justifyContent="center">
        <KeyPaper />
      </Row>
      <Box height={4} />
      <Card variant="form" mx={-4}>
        <Text as="h2" variant="h2">
          2.
          {t('headline')}
        </Text>
        <Box height={4} />
        <Text>
          <PrivateKeyExplanation />
        </Text>
        <Box height={6} />
        <Text>
          <ContactInformation />
        </Text>
        <Box height={6} />
        <Button
          onClick={() => {
            generateKey('/business/setup/verify-key')
          }}
          right={<ArrowsRight color="green" />}
        >
          {t('downloadKeyButtonText')}
        </Button>
        <Box height={6} />
        <Button
          onClick={() => {
            generateKey('/business/setup/keys')
          }}
          right={<ArrowsRight color="green" />}
          css={{ textAlign: 'center' }}
        >
          {t('printKeyButtonText')}
        </Button>
      </Card>
    </MobileApp>
  )
}

export default withOwner()(SetupSuccessPage)
