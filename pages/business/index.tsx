import * as React from 'react'
import Head from 'next/head'
import { withOwner, WithOwnerProps } from '@lib/pageWrappers/withOwner'
import { MobileApp } from '@ui/layouts/MobileApp'
import { Text, Card, Box, ButtonLink } from '@ui/core'
import { ArrowsLeft, ArrowsRight } from '@ui/anicons/Arrows'

const BusinessIndexPage: React.FC<WithOwnerProps> = () => {
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
          Seit Corona bist Du als Gastronom*In verpflichtet die Kontaktdaten
          deiner Gäste zu erfassen. Erspar Dir die Zettelwirtschaft! recover ist
          die einfachste Lösung für Dich und die sicherste für deine Gäste.
        </p>
      </Text>
      <Box height={4} />

      <Card p={6} mx={-4}>
        <Text as="h2" variant="h2">
          Betrieb registrieren
        </Text>
        <Box height={4} />
        <Text>
          <p>Mit recover bist Du startklar in 10 Minuten.</p>
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
            Verwalte deine Betriebe, drucke QR Codes und sehe aktuelle Checkins.
          </p>
        </Text>
        <Box height={4} />
        <ButtonLink href="/business/login">Einloggen</ButtonLink>
      </Card>
    </MobileApp>
  )
}

export default withOwner({ redirect: 'authorized' })(BusinessIndexPage)
