import * as React from 'react'
import Head from 'next/head'

import { WithOwnerProps, withValidPrivateKey } from '~lib/pageWrappers'
import { Text, Box, ButtonLink } from '~ui/core'
import { ArrowsRight } from '~ui/anicons'
import { MobileApp } from '~ui/layouts/MobileApp'
import { KeyViewer } from '~ui/blocks/KeyViewer'

import useLocale from '~locales/useLocale'

const SetupKeysPage: React.FC<WithOwnerProps> = ({ owner }) => {
  const { t } = useLocale('business/setup/keys')
  const { privateKey } = owner
  return (
    <MobileApp>
      <Head>
        <title key="title">{t('pageTitle')}</title>
      </Head>
      <Text as="h2" variant="h2">
        {t('title')}
      </Text>
      <Box height={6} />
      <>
        <Text>
          <p>
            <strong>{t('message1')}</strong>
          </p>
          <p>{t('message2')}</p>
        </Text>
        <Box height={4} />

        <Box mx={-6}>
          <KeyViewer value={privateKey} />
        </Box>

        <Box height={6} />
        <Text>
          <p>{t('message3')}</p>
        </Text>
        <Box height={6} />

        <ButtonLink
          href="/business/setup/verify-key-manually"
          right={<ArrowsRight color="green" />}
        >
          {t('submitButtonText')}
        </ButtonLink>
      </>
    </MobileApp>
  )
}

export default withValidPrivateKey()(SetupKeysPage)
