import * as React from 'react'

import { Text, Box, Button } from '~ui/core'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'

export const QrInfoModal: React.FC<ModalBaseProps> = (props) => {
  return (
    <ModalBase {...props} maxWidth={400} title="QR Code">
      <Text>
        <p>
          Wir haben den QR Code generiert. Der Download soll gleich starten.
          Speichere und drucke es aus mit Info über den Bereich und eine
          Erklärung über die Schritte zum Einschecken.
        </p>
        <p>Du kannst den unteren Text als Beispiel nehmen:</p>
        <ol
          style={{
            listStyle: 'decimal',
            margin: '14px 0',
            paddingLeft: '40px',
          }}
        >
          <li>
            Scanne diesen QR Code mit Deiner Kamera. Sollte eine Kamera den Code
            nicht erkennen, gib <a href="https://rcvr.app/qr">rcvr.app/qr</a> in
            deinem Browser ein.
          </li>
          <li>
            Beim ersten Checkin gibst Du Deinen Namen und Telefonnummer an.
            Deine Daten legen wir natürlich verschlüsselt und sicher ab!
          </li>
          <li>
            Wenn Du gehst, kannst Du dich im Browser auschecken. So können wir
            noch besser herausfinden, ob Du im Zweifel eine mögliche
            Kontaktperson bist oder nicht. Wir wünschen dir eine gute Zeit.
            Bleib gesund!
          </li>
        </ol>
      </Text>
      <Box height={6} />
      <Button onClick={props.onClose} css={{ width: '100%' }}>
        Schließen
      </Button>
    </ModalBase>
  )
}
