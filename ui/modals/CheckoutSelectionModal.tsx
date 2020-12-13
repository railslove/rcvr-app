import * as React from 'react'

import { Box, Button } from '~ui/core'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'
import { ArrowsRight } from '~ui/anicons'
import { useRouter } from 'next/router'

interface Props {
  openCheckout: Function
  openSepaCheckout: Function
}
type MProps = ModalBaseProps & Props

export const CheckoutSelectionModal: React.FC<MProps> = (props) => {
  const router = useRouter()

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
        onClick={() => router.replace('/business/sepaCheckout')}
        css={{ width: '100%' }}
        right={<ArrowsRight color="pink" />}
      >
        SEPA Lastschrift
      </Button>
    </ModalBase>
  )
}
