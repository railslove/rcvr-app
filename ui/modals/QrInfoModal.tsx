import * as React from 'react'
import { isFormal } from '~lib/config'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'
import { Box, Button, Text } from '~ui/core'


export const QrInfoModal: React.FC<ModalBaseProps> = (props) => {
  return (
    <ModalBase {...props} maxWidth={400} title="QR-Code wurde heruntergeladen!">
      <Text>
        <p>
          {isFormal
            ? 'Der QR-Code wurde in Ihren Downloads gespeichert. Drucken Sie ihn am besten zusammen mit einer kurzen Erklärung zum Checkin aus.'
            : 'Der QR-Code wurde in Deinen Downloads gespeichert. Drucke ihn am besten zusammen mit einer kurzen Erklärung zum Checkin aus.'}
        </p>
        <p>
          {isFormal ? 'Sie können' : 'Du kannst'} auch einfach unsere Vorlage
          nutzen:
        </p>
      </Text>
      <Box height={4} />
      <Box as="ol" css={{ listStyle: 'decimal' }} pl={5}>
        <Text as="li">
          {isFormal ? (
            <>
              Scannen Sie diesen QR-Code mit Ihrer Kamera. Sollte Ihre Kamera
              den Code nicht erkennen, geben Sie{' '}
              <strong>care.rcvr.app/qr</strong> in Ihren Browser ein.
            </>
          ) : (
            <>
              Scanne diesen QR-Code mit Deiner Kamera. Sollte Deine Kamera den
              Code nicht erkennen, gib <strong>rcvr.app/qr</strong> in deinem
              Browser ein.
            </>
          )}
          <Box height={2} />
        </Text>
        <Text as="li">
          <strong>Beim ersten Checkin</strong>{' '}
          {isFormal ? 'geben Sie Ihren' : 'gibst Du Deinen'} Namen,
          Telefonnummer und Adresse an. {isFormal ? 'Ihre' : 'Deine'} Daten
          legen wir natürlich verschlüsselt und sicher ab!
          <Box height={2} />
        </Text>
        <Text as="li">
          <strong>Wenn {isFormal ? 'Sie gehen' : 'Du gehst'}</strong>,{' '}
          {isFormal ? 'können Sie sich auf Ihrem' : 'kannst Du Dich auf deinem'}{' '}
          Handy wieder auschecken. So können wir noch besser herausfinden, ob{' '}
          {isFormal ? 'Sie' : 'Du'} im Zweifel eine mögliche Kontaktperson{' '}
          {isFormal ? 'sind' : 'bist'} oder nicht.
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
