import React from 'react'

import { MobileApp } from '~ui/layouts/MobileApp'
import { ArrowsLeft, ArrowsRight } from '~ui/anicons'
import { Box, ButtonLink, Card, Row, Text } from '~ui/core'

import { isRcvrEnv } from '~lib/config'

import usePageLocale from '~locales/usePageLocale'

export default function IndexPage() {
  const { t } = usePageLocale<'index'>()

  return (
    <MobileApp logoVariant="big">
      <Text as="h2" variant="h2">
        {t('title1')}
        <br />
        {t('title2')}
      </Text>
      <Box height={4} />
      <Text>
        <b>recover</b> <p>{t('indexIntro')}</p>
      </Text>
      <Box height={4} />

      <Card p={6} mx={-4}>
        <Text as="h2" variant="h2">
          {t('forVisitorsAndGuests')}
        </Text>
        <Box height={4} />
        <Text>
          <p>{t('rcvrProtectsData')}</p>
        </Text>
        <Box height={8} />

        <ButtonLink
          href="/qr"
          left={<ArrowsRight color="green" />}
          right={<ArrowsLeft color="green" />}
        >
          {t('scanCode')}
        </ButtonLink>
        <Box height={4} />
        <ButtonLink href="/my-checkins">{t('yourTickets')}</ButtonLink>
      </Card>
      <Box height={4} />
      <Card p={6} mx={-4}>
        <Text as="h2" variant="h2">
          {t(`forYourCompany`)}
        </Text>
        <Box height={4} />
        <Text>
          <p>{t('goodbyePaperwork')}</p>
        </Text>
        <Box height={8} />
        <ButtonLink href="/business">{t('recoverForCompanies')}</ButtonLink>
      </Card>
      <Row justifyContent="center" my={6}>
        <a
          href={t('whatIsRecoverLink')}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Text variant="link">{t('whatIsRecoverLinkText')}</Text>
        </a>
      </Row>
    </MobileApp>
  )
}
