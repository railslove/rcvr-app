import * as React from 'react'

import { Box, Button } from '~ui/core'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'
import { ArrowsRight } from '~ui/anicons'
import SepaPaymentContainer from '~ui/blocks/SepaPaymentContainer'

interface Props {
  children: Array<any>
  openStripeCheckout: () => void
}
type MProps = ModalBaseProps & Props

export const CheckoutSelectionModal: React.FC<MProps> = ({
  openStripeCheckout,
  ...modalProps
}) => {
  const [sepa, setSepa] = React.useState(false)

  return (
    <ModalBase {...modalProps} maxWidth={400} title="Zahlungsmethode">
      {sepa ? (
        <SepaPaymentContainer />
      ) : (
        <>
          <Box height={4} />
          <Button
            onClick={() => openStripeCheckout()}
            css={{ width: '100%' }}
            right={<ArrowsRight color="pink" />}
          >
            Kreditkarte
          </Button>
          <Box height={2} />
          <Button
            onClick={() => setSepa(true)}
            css={{ width: '100%' }}
            right={<ArrowsRight color="pink" />}
          >
            SEPA Lastschrift
          </Button>
        </>
      )}
    </ModalBase>
  )
}
