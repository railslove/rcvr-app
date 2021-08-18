import * as React from 'react'
import Head from 'next/head'

import { Box, Text, Row } from '~ui/core'
import { Circle } from '~ui/anicons'
import { Phone } from '~ui/svg'
import { MobileApp } from '~ui/layouts/MobileApp'
import { FixedBottomBar } from '~ui/blocks/BottomBar'
import usePageLocale from '~locales/usePageLocale'

export default function CoronaPage() {
  const { t } = usePageLocale('corona')

  return (
    <MobileApp>
      <Head>
        <title key="title">{t('pageTitle')} | recover</title>
      </Head>
      <Text as="h2" variant="h2">
        {t('title')}
      </Text>
      <Box height={5} />
      <Text>
        <p>{t('description1')}</p>
        <p>{t('description2')}</p>
        <p>{t('description3')}</p>
      </Text>
      <Box height={6} />
      <Row>
        <Circle size={36} color="red.400">
          <Phone />
        </Circle>
        <Box ml={3}>
          <Text variant="h3">{t('hotlineTitle')}</Text>
          <Text variant="h2">
            <a href={`tel:${t('coronaHotlinePhoneValue')}`}>
              {t('coronaHotlinePhoneText')}
            </a>
          </Text>
        </Box>
      </Row>
      <Box height={6} />
      <Text variant="h3">{t('moreQuestionsTitle')}</Text>
      <Box height={2} />
      <Text>
        <p>
          {t('moreQuestionsText1')}{' '}
          <a
            href={t('moreQuestionsLinkValue')}
            target="blank"
            rel="noopener noreferrer"
          >
            {t('moreQuestionsLinkText')}
          </a>
          . {t('moreQuestionsText2')}
        </p>
      </Text>
      <FixedBottomBar />
    </MobileApp>
  )
}
