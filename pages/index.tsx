import { isCareEnv, isHealthEnv } from '~lib/config'
import { ArrowsLeft, ArrowsRight } from '~ui/anicons'
import { Box, ButtonLink, Card, Row, Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'
import { translate } from '~lib/translate'

export default function IndexPage() {
  return (
    <MobileApp logoVariant="big">
      <Text as="h2" variant="h2">
        {translate('title')}
        <br />
        {translate('subtitle')}
      </Text>
      <Box height={4} />
      <Text>
        <p>{translate('indexIntro')}</p>
      </Text>
      <Box height={4} />

      <Card p={6} mx={-4}>
        <Text as="h2" variant="h2">
          {translate(`forVisitorsAndGuests`)}
        </Text>
        <Box height={4} />
        <Text>
          <p>{translate(`rcvrProtectsData`)}</p>
        </Text>
        <Box height={8} />

        <ButtonLink
          href="/qr"
          left={<ArrowsRight color="green" />}
          right={<ArrowsLeft color="green" />}
        >
          {translate('scanCode')}
        </ButtonLink>
        <Box height={4} />
        <ButtonLink href="/my-checkins">{translate(`yourTickets`)}</ButtonLink>
      </Card>
      <Box height={4} />
      <Card p={6} mx={-4}>
        <Text as="h2" variant="h2">
          {translate(`forYourCompany`)}
        </Text>
        <Box height={4} />
        <Text>
          <p>{translate(`goodbyePaperwork`)}</p>
        </Text>
        <Box height={8} />
        <ButtonLink href="/business">
          {translate(`recoverForCompanies`)}
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
          <Text variant="link">{translate('whatIsRecover')}</Text>
        </a>
      </Row>
    </MobileApp>
  )
}
