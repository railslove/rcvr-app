import * as React from 'react'
import Head from 'next/head'

import { Text, Card, Box, ButtonLink } from '~ui/core'
import { ArrowsLeft, ArrowsRight } from '~ui/anicons'
import { MobileApp } from '~ui/layouts/MobileApp'

export default function BusinessIndexPage() {
  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">Für Betriebe | recover</title>
      </Head>
      <Text as="h2" variant="h2">
        für Betriebe
      </Text>
      <Box height={4} />
      <Text>
        <p>
          Seit Corona sind Sie als Gastronom*In verpflichtet die Kontaktdaten
          Ihrer Besucher und Gäste zu erfassen. Erspar Ihnen die Zettelwirtschaft! recover ist
          die einfachste Lösung für Dich und die sicherste für Ihre Besucher und Gäste.
        </p>
      </Text>
      <Box height={4} />

      <Card p={6} mx={-4}>
        <Text as="h2" variant="h2">
          Betrieb registrieren
        </Text>
        <Box height={4} />
        <Text>
          <p>Mit recover sind Sie startklar in 10 Minuten.</p>
        </Text>
        <Box height={4} />
        <ButtonLink
          href="/business/setup/intro"
          left={<ArrowsRight color="green" />}
          right={<ArrowsLeft color="green" />}
        >
          Registrieren
        </ButtonLink>
      </Card>
      <Box height={4} />

      <Card p={6} mx={-4}>
        <Text as="h2" variant="h2">
          Schon registriert?
        </Text>
        <Box height={4} />
        <Text>
          <p>
            Verwalte Ihre Betriebe, drucke QR Codes und sehe aktuelle Checkins.
          </p>
        </Text>
        <Box height={4} />
        <ButtonLink href="/business/login">Einloggen</ButtonLink>
      </Card>
    </MobileApp>
  )
}
