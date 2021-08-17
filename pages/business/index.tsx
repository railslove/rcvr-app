import React from 'react'
import Head from 'next/head'

import useLocale from '~locales/useLocale'
import { ArrowsLeft, ArrowsRight } from '~ui/anicons'
import { Box, ButtonLink, Card, Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'

export default function BusinessIndexPage() {
  const { t } = useLocale('business/index')

  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">{t('title')} | recover</title>
      </Head>
      <Text as="h2" variant="h2">
        {t('title')}
      </Text>
      <Box height={4} />
      <Text>
        <p>{t('subtitle')}</p>
      </Text>
      <Box height={4} />

      <Card p={6} mx={-4}>
        <Text as="h2" variant="h2">
          {t('registerTitle')}
        </Text>
        <Box height={4} />
        <Text>
          <p>{t('registerMessage')}</p>
        </Text>
        <Box height={4} />
        <ButtonLink
          href="/business/setup/intro"
          left={<ArrowsRight color="green" />}
          right={<ArrowsLeft color="green" />}
        >
          {t('register')}
        </ButtonLink>
      </Card>
      <Box height={4} />

      <Card p={6} mx={-4}>
        <Text as="h2" variant="h2">
          {t('alreadyRegisteredTitle')}
        </Text>
        <Box height={4} />
        <Text>
          <p>{t('alreadyRegisteredMessage')}</p>
        </Text>
        <Box height={4} />
        <ButtonLink href="/business/login">{t('login')}</ButtonLink>
      </Card>
    </MobileApp>
  )
}
