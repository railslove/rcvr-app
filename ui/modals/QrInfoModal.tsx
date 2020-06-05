import * as React from 'react'

import { Text, Box, Button } from '~ui/core'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'

export const QrInfoModal: React.FC<ModalBaseProps> = (props) => {
  return (
    <ModalBase {...props} maxWidth={400} title="QR-Code wurde heruntergeladen!">
      <Text>
        <p>
          Der QR-Code wurde in deinen Downloads gespeichert. Drucke ihn am
          besten zusammen mit einer kurzen Erklärung zum Checkin aus.
        </p>
        <p>Du kannst auch einfach unsere Vorlage nutzen:</p>
      </Text>
      <Box height={4} />
      <Box as="ol" css={{ listStyle: 'decimal' }} pl={5}>
        <Text as="li">
          Scanne diesen QR-Code mit Deiner Kamera. Sollte deine Kamera den Code
          nicht erkennen, gib <strong>rcvr.app/qr</strong> in deinem Browser
          ein.
          <Box height={2} />
        </Text>
        <Text as="li">
          <strong>Beim ersten Checkin</strong> gibst Du deinen Namen,
          Telefonnummer und Adresse an. Deine Daten legen wir natürlich
          verschlüsselt und sicher ab!
          <Box height={2} />
        </Text>
        <Text as="li">
          <strong>Wenn Du gehst</strong>, kannst Du dich auf deinem Handy wieder
          auschecken. So können wir noch besser herausfinden, ob Du im Zweifel
          eine mögliche Kontaktperson bist oder nicht.
          <Box height={2} />
        </Text>
      </Box>
      <Box height={6} />
      <Button onClick={props.onClose} css={{ width: '100%' }}>
        Schließen
      </Button>
    </ModalBase>
  )
}
