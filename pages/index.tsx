import * as React from 'react'

import { Box, Text, ButtonLink, Card, Row } from '~ui/core'
import { ArrowsLeft, ArrowsRight } from '~ui/anicons'
import { MobileApp } from '~ui/layouts/MobileApp'

export default function IndexPage() {
  return (
    <MobileApp logoVariant="big">
      <Text as="h2" variant="h2">
        Checkins per QR-Code.
        <br />
        Ohne App, einfach für alle.
      </Text>
      <Box height={4} />
      <Text>
        <p>
          recover ist die digitale Kontaktdatenliste für Betriebe und deren
          Gäste. Einfach, sicher, schnell.
        </p>
      </Text>
      <Box height={4} />

      <Card p={6} mx={-4}>
        <Text as="h2" variant="h2">
          Für Gäste
        </Text>
        <Box height={4} />
        <Text>
          <p>recover schützt Ihre Daten besser als jedes Papier.</p>
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
        <ButtonLink href="/my-checkins">Ihre Tickets</ButtonLink>
      </Card>
      <Box height={4} />

      <Card p={6} mx={-4}>
        <Text as="h2" variant="h2">
          Für Ihren Betrieb
        </Text>
        <Box height={4} />
        <Text>
          <p>
            Tschüss, Zettelwirtschaft! recover ist die digitale
            Kontaktdatenliste Ihrer Gäste. Einfach, sicher, schnell.
          </p>
        </Text>
        <Box height={8} />
        <ButtonLink href="/business">Recover für Betriebe</ButtonLink>
      </Card>
      <Row justifyContent="center" my={6}>
        <a
          href="https://www.recoverapp.de/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Text variant="link">Was ist recover?</Text>
        </a>
      </Row>
    </MobileApp>
  )
}
