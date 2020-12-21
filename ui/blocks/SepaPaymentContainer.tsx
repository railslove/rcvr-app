import * as React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, Stripe } from '@stripe/stripe-js'

import { postOwnerStripeIntent } from '~lib/api'
import SepaPayment from '~ui/blocks/SepaPayment'
import { Loading } from './Loading'

interface StripeSetup {
  stripe: Stripe
  intent: string
}

const SepaPaymentContainer: React.FC = () => {
  const [loading, setLoading] = React.useState(true)
  const [stripeSetup, setStripeSetup] = React.useState<StripeSetup>()
  const [error, setError] = React.useState()

  const initializeStripe = React.useCallback(async () => {
    try {
      const [stripe, intent] = await Promise.all([
        loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
        postOwnerStripeIntent(),
      ])
      setStripeSetup({ stripe, intent: intent.id })
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    initializeStripe()
  }, [initializeStripe])

  return (
    <>
      {loading && <Loading show />}
      {error && <div>{error}</div>}
      {stripeSetup && (
        <Elements stripe={stripeSetup.stripe}>
          <SepaPayment intent={stripeSetup.intent} />
        </Elements>
      )}
    </>
  )
}

export default SepaPaymentContainer
