import * as React from 'react'

import { Box, Button } from '~ui/core'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'
import { ArrowsRight } from '~ui/anicons'

interface Props {
  openCheckout: Function
}
type MProps = ModalBaseProps & Props

export const CheckoutSelectionModal: React.FC<MProps> = (props) => {
  return (
    <ModalBase {...props} maxWidth={400} title="Zahlungsmethode">
      <Box height={2} />
      <Button
        onClick={() => props.openCheckout()}
        css={{ width: '100%' }}
        right={<ArrowsRight color="pink" />}
      >
        Kredit Karte
      </Button>
      <Box height={2} />
      <Button
        onClick={props.onClose}
        css={{ width: '100%' }}
        right={<ArrowsRight color="pink" />}
      >
        SEPA Lastschrift
      </Button>
    </ModalBase>
  )
}
