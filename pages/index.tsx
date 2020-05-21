import * as React from 'react'

import { Box, Text, ButtonLink, Card } from '@ui/core'
import { GuestApp } from '@ui/layouts/GuestApp'
import { ArrowsLeft, ArrowsRight } from '@ui/anicons/Arrows'

const Index: React.FC<{}> = () => {
  return (
    <GuestApp logoVariant="big">
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
          <p>recover schützt Deine Daten besser als jedes Papier.</p>
        </Text>
        <Box height={8} />

        <ButtonLink
          href="/qr"
          left={<ArrowsRight color="green" />}
          right={<ArrowsLeft color="green" />}
          css={{ width: '100%' }}
        >
          QR Code scannen
        </ButtonLink>
        <Box height={4} />
        <ButtonLink href="/my-checkins">Deine Tickets</ButtonLink>
      </Card>
      <Box height={4} />

      <Card p={6} mx={-4}>
        <Text as="h2" variant="h2">
          Für deinen Betrieb
        </Text>
        <Box height={4} />
        <Text>
          <p>
            Tschüss, Zettelwirtschaft! recover ist die digitale
            Kontaktdatenliste deiner Gäste. Einfach, sicher, schnell.
          </p>
        </Text>
        <Box height={8} />
        <ButtonLink href="/business">Recover für Betriebe</ButtonLink>
      </Card>
    </GuestApp>
  )
}

export default Index
