import * as React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/router'

import { useModals } from '~lib/hooks'
import { postOwnerStripeIntent } from '~lib/api'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { OwnerApp } from '~ui/layouts/OwnerApp'
import { Loading } from '~ui/blocks/Loading'
import { SubscribedModal } from '~ui/modals/SubscribedModal'
import { CheckoutSelectionModal } from '~ui/modals/CheckoutSelectionModal'
import PaymentSetupForm from '~lib/stripe/PaymentSetupForm'

const SepaCheckoutPage: React.FC<WithOwnerProps> = ({ owner }) => {
  const [redirecting, setRedirecting] = React.useState(false)
  const [stripePromise, setStripePromise] = React.useState(null)
  const [stripeIntent, setStripeIntent] = React.useState(null)
  const { query } = useRouter()
  const status = React.useMemo(() => {
    if (query.success?.toString() === 'true') return 'success'
  }, [query])

  const { modals, openModal } = useModals({
    checkoutSelection: CheckoutSelectionModal,
    success: SubscribedModal,
  })

  const openSepaCheckout = React.useCallback(async () => {
    try {
      setRedirecting(true)
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      )
      const intent = await postOwnerStripeIntent()
      setStripeIntent(intent.id)
      setStripePromise(stripe)
    } catch (error) {
      setRedirecting(false)
      console.error(error)
    } finally {
      setRedirecting(false)
    }
  }, [])

  React.useEffect(() => {
    openSepaCheckout()
  }, [openSepaCheckout])

  return (
    <OwnerApp title="SEPA Lastschrift">
      <Loading show={redirecting} />
      {modals}
      {stripeIntent && stripePromise && (
        <Elements stripe={stripePromise}>
          <PaymentSetupForm intent={stripeIntent} />
        </Elements>
      )}
    </OwnerApp>
  )
}

export default withOwner()(SepaCheckoutPage)
