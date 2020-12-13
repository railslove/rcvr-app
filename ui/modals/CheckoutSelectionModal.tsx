import * as React from 'react'

import { Box, Button } from '~ui/core'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'
import { ArrowsRight } from '~ui/anicons'

interface Props {
  openCheckout: Function
  openSepaCheckout: Function
}
type MProps = ModalBaseProps & Props

export const CheckoutSelectionModal: React.FC<MProps> = (props) => {
  const openSepaCheckout = () => {
    props.openSepaCheckout()
    props.onClose()
  }

  return (
    <ModalBase {...props} maxWidth={400} title="Zahlungsmethode">
      <Box height={4} />
      <Button
        onClick={() => props.openCheckout()}
        css={{ width: '100%' }}
        right={<ArrowsRight color="pink" />}
      >
        Kreditkarte
      </Button>
      <Box height={2} />
      <Button
        onClick={() => openSepaCheckout()}
        css={{ width: '100%' }}
        right={<ArrowsRight color="pink" />}
      >
        SEPA Lastschrift
      </Button>
    </ModalBase>
  )
}
