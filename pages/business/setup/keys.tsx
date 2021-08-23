import * as React from 'react'
import Head from 'next/head'
import { WithOwnerProps, withValidPrivateKey } from '~lib/pageWrappers'

import { Text, Box, ButtonLink, Button } from '~ui/core'
import { ArrowsRight } from '~ui/anicons'
import { MobileApp } from '~ui/layouts/MobileApp'
import styled from '@emotion/styled'
import { KeyViewer } from '~ui/blocks/KeyViewer/KeyViewer'

import usePageLocale from '~locales/usePageLocale'
import PageTitle from '~ui/blocks/Title/PageTitle'

const SetupKeysPage: React.FC<WithOwnerProps> = ({ owner }) => {
  const { t } = usePageLocale('business/setup/keys')
  const { privateKey } = owner
  return (
    <MobileApp>
      <Head>
        <PageTitle>{t('pageTitle')}</PageTitle>
      </Head>
      <Text as="h2" variant="h2">
        {t('title')}
      </Text>
      <Box height={6} />
      <>
        <TextNoPrint>
          <p>
            <strong>{t('message1')}</strong>
          </p>
          <p>{t('message2')}</p>
        </TextNoPrint>
        <Box height={4} />

        <Box mx={-6}>
          <KeyViewer value={privateKey} />
        </Box>

        <Box height={6} />
        <TextNoPrint>
          <p>{t('message3')}</p>
        </TextNoPrint>
        <Box height={6} />

        <ButtonLinkNoPrint
          href="/business/setup/verify-key-manually"
          right={<ArrowsRight color="green" />}
        >
          {t('verifyKeyButtonText')}
        </ButtonLinkNoPrint>
        <Box height={4} />
        <ButtonNoPrint onClick={window.print}>
          {t('printKeyButtonText')}
        </ButtonNoPrint>
      </>
    </MobileApp>
  )
}

const TextNoPrint = styled(Text)`
  @media print {
    display: none;
  }
`
const ButtonLinkNoPrint = styled(ButtonLink)`
  @media print {
    display: none;
  }
`
const ButtonNoPrint = styled(Button)`
  @media print {
    display: none;
  }
`
export default withValidPrivateKey()(SetupKeysPage)
