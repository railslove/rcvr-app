import * as React from 'react'
import Head from 'next/head'

import { isCareEnv } from '~lib/config'
import { Text, Card, Box, ButtonLink } from '~ui/core'
import { ArrowsLeft, ArrowsRight } from '~ui/anicons'
import { MobileApp } from '~ui/layouts/MobileApp'

export default function BusinessIndexPage() {
  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">
          Für {isCareEnv ? 'Pflegeeinrichtungen' : 'Betriebe'} | recover
        </title>
      </Head>
      <Text as="h2" variant="h2">
        Für {isCareEnv ? 'Pflegeeinrichtungen' : 'Betriebe'}
      </Text>
      <Box height={4} />
      <Text>
        <p>
          {isCareEnv
            ? 'Seit Corona sind Sie als Pflegeeinrichtung verpflichtet die Kontaktdaten Ihrer Besucher und Gäste zu erfassen. Ersparen Sie sich die Zettelwirtschaft! recover ist die einfachste Lösung für Sie und die sicherste für Ihre Besucher und Gäste.'
            : 'Seit Corona bist Du als Gastronom*In verpflichtet die Kontaktdaten deiner Gäste zu erfassen. Erspar Dir die Zettelwirtschaft! recover ist die einfachste Lösung für Dich und die sicherste für deine Gäste.'}
        </p>
      </Text>
      <Box height={4} />

      <Card p={6} mx={-4}>
        <Text as="h2" variant="h2">
          {isCareEnv ? 'Pflegeeinrichtung' : 'Betrieb'} registrieren
        </Text>
        <Box height={4} />
        <Text>
          <p>
            {isCareEnv
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
            {isCareEnv
              ? 'Hier können Sie ihre Pflegeeinrichtungen verwalten, QR Codes ausdrucken und aktuelle Checkins sehen.'
              : 'Verwalte deine Betriebe, drucke QR Codes aus und sehe aktuelle Checkins.'}
          </p>
        </Text>
        <Box height={4} />
        <ButtonLink href="/business/login">Einloggen</ButtonLink>
      </Card>
    </MobileApp>
  )
}
