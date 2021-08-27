import * as React from 'react'
import { vercel_url, isCareEnv, isFormal, isHealthEnv } from '~lib/config'
import { ArrowsLeft, ArrowsRight } from '~ui/anicons'
import { Box, ButtonLink, Card, Row, Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'
import { indexIntro } from '~ui/whitelabels'

export default function IndexPage() {
  console.log('vercel_url(' + vercel_url + ')')
  return (
    <MobileApp logoVariant="big">
      <Text as="h2" variant="h2">
        Checkins per QR-Code.
        <br />
        Ohne App, einfach für alle.
      </Text>
      <Box height={4} />
      <Text>
        <p>{indexIntro}</p>
      </Text>
      <Box height={4} />

      <Card p={6} mx={-4}>
        <Text as="h2" variant="h2">
          {isFormal ? 'Für Besucher und Gäste' : 'Für Gäste'}
        </Text>
        <Box height={4} />
        <Text>
          <p>
            {isFormal
              ? 'recover schützt Ihre Daten besser als Papier'
              : 'recover schützt Deine Daten besser als jedes Papier.'}
          </p>
        </Text>
        <Box height={8} />

        <ButtonLink
          href="/qr"
          left={<ArrowsRight color="green" />}
          right={<ArrowsLeft color="green" />}
        >
          QR-Code scannen
        </ButtonLink>
        <Box height={4} />
        <ButtonLink href="/my-checkins">
          {isFormal ? 'Ihre Tickets' : 'Deine Tickets'}
        </ButtonLink>
      </Card>
      <Box height={4} />
      <Card p={6} mx={-4}>
        <Text as="h2" variant="h2">
          {isFormal ? 'Für Ihre Einrichtung' : 'Für Deinen Betrieb'}
        </Text>
        <Box height={4} />
        <Text>
          <p>
            {isFormal
              ? 'Tschüss, Zettelwirtschaft! recover ist die digitale Kontaktdatenliste Ihrer Besucher und Gäste. Einfach, sicher, schnell.'
              : 'Tschüss, Zettelwirtschaft! recover ist die digitale Kontaktdatenliste deiner Gäste. Einfach, sicher, schnell.'}
          </p>
        </Text>
        <Box height={8} />
        <ButtonLink href="/business">
          Recover für {isFormal ? 'Einrichtungen' : 'Betriebe'}
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
          <Text variant="link">Was ist recover?</Text>
        </a>
      </Row>
    </MobileApp>
  )
}
