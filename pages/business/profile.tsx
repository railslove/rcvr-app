import * as React from 'react'
import { loadStripe } from '@stripe/stripe-js'

import { postCheckout } from '~lib/api/checkouts'
import { postBillingPortalSession } from '~lib/api/stripe_billing_portal_sessions.ts'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { Button, Text, Divider } from '~ui/core'
import { Loading } from '~ui/blocks/Loading'
import { OwnerApp } from '~ui/layouts/OwnerApp'

const ProfilePage: React.FC<WithOwnerProps> = () => {
  const [redirecting, setRedirecting] = React.useState(false)

  const handlePayNow = React.useCallback(async () => {
    try {
      setRedirecting(true)
      const stripe = await loadStripe(process.env.stripePublishableKey)
      const checkout = await postCheckout()
      stripe.redirectToCheckout({ sessionId: checkout.id })
    } catch (error) {
      setRedirecting(false)
      console.error(error)
    }
  }, [])

  const handleOpenSelfService = React.useCallback(async () => {
    try {
      setRedirecting(true)
      const billingSession = await postBillingPortalSession()
      window.location.href = billingSession.url
    } catch (error) {
      setRedirecting(false)
      console.error(error)
    }
  }, [])

  return (
    <OwnerApp title="Mein Profil">
      <Loading show={redirecting} />
      <Divider />
      <Text as="h3" variant="h2">
        Mein Abonnement
      </Text>
      <Button onClick={handlePayNow}>
        Credit Karten Infos und Adresse Ändern
      </Button>
      <Button onClick={handleOpenSelfService}>
        Subscription Canceln und Invoices runterladen
      </Button>
    </OwnerApp>
  )
}

export default withOwner()(ProfilePage)
