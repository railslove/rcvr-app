import * as React from 'react'

import { Button, Box, Text, Card, List, ListItem } from '~ui/core'
import { ArrowsRight } from '~ui/anicons'

type ConfirmationProps = {
  onSubmit: () => void
}

export const Confirmation: React.FC<ConfirmationProps> = ({ onSubmit }) => {
  return (
    <Card variant="form" mx={-4}>
      <Text variant="h3" as="h3">
        Checkin nur ohne Symptome
      </Text>
      <Box height={5} />
      <Text>
        <p>Mit dem Klicken auf weiter bestätige ich, dass:</p>

        <p>
          ich innerhalb der letzten 14 Tage keinen Kontakt zu einer SARS-CoV-2
          positive getesteten Person hatte und in keinem Risikogebiet war.
        </p>

        <p>ich keines der folgenden Symptome aufweise:</p>

        <List>
          <ListItem>Fieber</ListItem>
          <ListItem>Halsschmerzen und oder Schluckbeschwerden</ListItem>
          <ListItem>Husten</ListItem>
          <ListItem>Atemnot</ListItem>
          <ListItem>Geschmacks- oder Geruchsverlust</ListItem>
          <ListItem>
            Allgemeine Abgeschlagenheit und/oder Leistungsverlust - soweit nicht
            durch eine bestehende Vorerkrankung erklärbar
          </ListItem>
          <ListItem>
            Starker Schnupfen, soweit nicht durch eine bestehende Vorerkrankung
            (z. B. Allergien) erklärbar
          </ListItem>
        </List>
      </Text>
      <Box height={5} />
      <Button
        type="button"
        onClick={onSubmit}
        css={{ width: '100%' }}
        right={<ArrowsRight color="green" />}
      >
        Weiter
      </Button>
    </Card>
  )
}
