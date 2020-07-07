import * as React from 'react'

import { Text, Box, Button, Row } from '~ui/core'
import { Circle, Check } from '~ui/anicons'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'

export const SubscribedModal: React.FC<ModalBaseProps> = (props) => {
  return (
    <ModalBase {...props} maxWidth={400} title="Upgrade erfolgreich!">
      <Text>
        <p>Wir freuen uns, dass Sie recover nutzten!</p>
        <Row justifyContent="center" my={8}>
          <Circle animated delay={0.5} color="green">
            <Check delay={0.8} css={{ position: 'relative', top: 2 }} />
          </Circle>
        </Row>
        <p>
          Es kann einen kurzen Moment dauern, bis sich der Status Ihrer
          Mitgliedschaft aktualisiert.
        </p>
      </Text>
      <Box height={6} />
      <Button onClick={props.onClose} css={{ width: '100%' }}>
        Schließen
      </Button>
    </ModalBase>
  )
}
