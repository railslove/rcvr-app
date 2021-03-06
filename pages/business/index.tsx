import Head from 'next/head'
import * as React from 'react'
import { isFormal } from '~lib/config'
import { ArrowsLeft, ArrowsRight } from '~ui/anicons'
import { Box, ButtonLink, Card, Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'

export default function BusinessIndexPage() {
  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">
          Für {isFormal ? 'Einrichtungen' : 'Betriebe'} | recover
        </title>
      </Head>
      <Text as="h2" variant="h2">
        Für {isFormal ? 'Einrichtungen' : 'Betriebe'}
      </Text>
      <Box height={4} />
      <Text>
        <p>
          {isFormal
            ? 'Seit Ausbruch der Corona-Pandemie sind auch Krankenhausbetreiber und Betreiber von Gesundheitseinrichtungen verpflichtet die Kontaktdaten Ihrer Besucher zu erfassen. Ersparen Sie sich die Zettelwirtschaft! recover ist die einfachste Lösung für Sie und die sicherste für Ihre Besucher.'
            : 'Seit Corona sind viele Betriebe und Einrichtungen verpflichtet, Kontaktdaten zu erfassen. Erspar Dir die Zettelwirtschaft! recover ist die einfachste Lösung für Dich und die sicherste für Deine Besucher oder Gäste.'}
        </p>
      </Text>
      <Box height={4} />

      <Card p={6} mx={-4}>
        <Text as="h2" variant="h2">
          {isFormal ? 'Einrichtung' : 'Betrieb'} registrieren
        </Text>
        <Box height={4} />
        <Text>
          <p>
            {isFormal
              ? 'Mit recover sind Sie startklar in 10 Minuten.'
              : 'Mit recover bist Du startklar in 10 Minuten.'}
          </p>
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
            {isFormal
              ? 'Hier können Sie ihre Einrichtungen verwalten, QR Codes ausdrucken und aktuelle Checkins sehen.'
              : 'Verwalte Deine Betriebe, drucke QR Codes aus und sehe aktuelle Checkins.'}
          </p>
        </Text>
        <Box height={4} />
        <ButtonLink href="/business/login">Einloggen</ButtonLink>
      </Card>
    </MobileApp>
  )
}
