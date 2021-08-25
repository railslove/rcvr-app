import * as React from 'react'

import { Box, Button } from '~ui/core'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'
import { ArrowsRight } from '~ui/anicons'
import SepaPaymentContainer from '~ui/blocks/SepaPayment/SepaPaymentContainer'

export interface CheckoutSelectionModalProps {
  locales: {
    title: string
    stripeButtonText: string
    sepaDebitButtonText: string
  }
  children?: Array<any>
  openStripeCheckout: () => void
}
type MProps = ModalBaseProps & CheckoutSelectionModalProps

export const CheckoutSelectionModal: React.FC<MProps> = ({
  locales,
  openStripeCheckout,
  ...modalProps
}) => {
  const [sepa, setSepa] = React.useState(false)

  return (
    <ModalBase {...modalProps} maxWidth={400} title={locales.title}>
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
            {locales.stripeButtonText}
          </Button>
          <Box height={2} />
          <Button
            onClick={() => setSepa(true)}
            css={{ width: '100%' }}
            right={<ArrowsRight color="pink" />}
          >
            {locales.sepaDebitButtonText}
          </Button>
        </>
      )}
    </ModalBase>
  )
}
