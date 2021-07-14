import * as React from 'react'
import { isCareEnv, isFormal, formalPostfix, isHealthEnv } from '~lib/config'
import { ArrowsLeft, ArrowsRight } from '~ui/anicons'
import { Box, ButtonLink, Card, Row, Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'
import { indexIntro } from '~ui/whitelabels'
import useTranslation from 'next-translate/useTranslation'

export default function IndexPage() {
  // optional: const {t, lang } = useTranslation('checkin')
  const {t} = useTranslation('checkin')
  return (
    <MobileApp logoVariant="big">
      <Text as="h2" variant="h2">
        {t('title')}<br />{t('subtitle')}
      </Text>
      <Box height={4} />
      <Text>
        <p>{indexIntro}</p>
      </Text>
      <Box height={4} />

      <Card p={6} mx={-4}>
        <Text as="h2" variant="h2">
          {t(`forVisitorsAndGuests${formalPostfix}`)}
        </Text>
        <Box height={4} />
        <Text>
          <p>{t(`rcvrProtectsData${formalPostfix}`)}</p>
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
        <ButtonLink href="/my-checkins">
        {t(`yourTickets${formalPostfix}`)}
        </ButtonLink>
      </Card>
      <Box height={4} />
      <Card p={6} mx={-4}>
        <Text as="h2" variant="h2">
        {t(`forYourCompany${formalPostfix}`)}
        </Text>
        <Box height={4} />
        <Text>
          <p>{t(`goodbyePaperwork${formalPostfix}`)}</p>
        </Text>
        <Box height={8} />
        <ButtonLink href="/business">
        {t(`recoverForCompanies${formalPostfix}`)}
        </ButtonLink>
      </Card>
      <Row justifyContent="center" my={6}>
        <a
          href={
            isCareEnv
              ? 'https://recovercare.de/'
              : isHealthEnv
              ? 'https://www.recover-health.de'
              : 'https://www.recoverapp.de/'
          }
          target="_blank"
          rel="noreferrer noopener"
        >
          <Text variant="link">{t('whatIsRecover')}</Text>
        </a>
      </Row>
    </MobileApp>
  )
}
