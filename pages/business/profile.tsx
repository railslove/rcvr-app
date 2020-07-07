import * as React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import formatDate from 'intl-dateformat'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useCompanies, useModals } from '~lib/hooks'
import { postOwnerCheckout, postOwnerSubscription } from '~lib/api'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { Box, Button, Text, Divider, Callout } from '~ui/core'
import { Right } from '~ui/svg'
import { ArrowsRight } from '~ui/anicons'
import { OwnerApp } from '~ui/layouts/OwnerApp'
import { Loading } from '~ui/blocks/Loading'
import { ActionList } from '~ui/blocks/ActionList'
import { ActionCard } from '~ui/blocks/ActionCard'
import { SubscribedModal } from '~ui/modals/SubscribedModal'

const ProfilePage: React.FC<WithOwnerProps> = ({ owner }) => {
  const [redirecting, setRedirecting] = React.useState(false)
  const { data: companies } = useCompanies()
  const { query } = useRouter()
  const status = React.useMemo(() => {
    if (query.success?.toString() === 'true') return 'success'
  }, [query])

  const didOpenSuccessModal = React.useRef(false)
  const { modals, openModal } = useModals({
    success: SubscribedModal,
  })

  React.useEffect(() => {
    if (didOpenSuccessModal.current) return
    if (status === 'success') {
      didOpenSuccessModal.current = true
      openModal('success')
    }
  }, [status, openModal])

  const openCheckout = React.useCallback(async () => {
    try {
      setRedirecting(true)
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      )
      const checkout = await postOwnerCheckout()
      stripe.redirectToCheckout({ sessionId: checkout.id })
    } catch (error) {
      setRedirecting(false)
      console.error(error)
    }
  }, [])

  const openSelfService = React.useCallback(async () => {
    try {
      setRedirecting(true)
      const { url } = await postOwnerSubscription()
      window.location.href = url
    } catch (error) {
      setRedirecting(false)
      console.error(error)
    }
  }, [])

  const hasCompanies = React.useMemo(() => companies?.length > 0, [companies])
  const hasSubscription = React.useMemo(() => {
    const states = ['trialing', 'active', 'incomplete']
    const isSubscribed = states.includes(owner.stripeSubscriptionStatus)
    return isSubscribed || owner.canUseForFree
  }, [owner])

  return (
    <OwnerApp title="Mein Profil">
      {modals}
      <Loading show={redirecting} />
      <Divider />
      <Text as="h3" variant="h2">
        Meine Mitgliedschaft
      </Text>
      <Box height={4} />
      {hasCompanies ? (
        <SubscriptionMessage owner={owner} />
      ) : (
        <Callout>
          <Text>Sie müssen zuerst einen Betrieb anlegen.</Text>
        </Callout>
      )}
      <Box height={4} />

      {!hasSubscription && hasCompanies && (
        <>
          <Text>
            <p>
              Sie dürfen recover 14 Tage lang kostenlos auf Herz und Nieren
              testen.
              <br />
              Danach kostet die Mitgliedschaft 15€ zzgl. USt. pro Monat und
              Betrieb. Sie können Ihre Mitgliedschaft jederzeit zum Monatsende
              kündigen.
              <br />
              Wenn Sie Anspruch auf eine kostenlose oder reduzierte Nutzung von
              der Recover App haben, melde dich gerne bei unserem Support, damit
              wir Ihren Laden überprüfen und freischalten können:{' '}
              <a href="mailto:team@recoverapp.de">team@recoverapp.de</a>
            </p>
          </Text>
          <Box height={4} />
          <Button onClick={openCheckout} right={<ArrowsRight color="pink" />}>
            Jetzt upgraden
          </Button>
        </>
      )}

      {hasSubscription && !owner.canUseForFree && (
        <>
          <ActionList grid>
            <ActionCard onClick={openCheckout}>
              <ActionCard.Main title="Rechnungsdaten ändern" icon={Right} />
            </ActionCard>
            <ActionCard onClick={openSelfService}>
              <ActionCard.Main title="Ihre Rechnungen" icon={Right} />
            </ActionCard>
          </ActionList>

          <Divider />

          <ActionList grid>
            <ActionCard onClick={openSelfService}>
              <ActionCard.Main title="Mitgliedschaft verwalten" icon={Right} />
            </ActionCard>
            <div />
          </ActionList>
          <Box height={4} />
          <Text variant="shy">
            Sie können Ihre Mitgliedschaft jederzeit zum Monatsende kündigen.
          </Text>
        </>
      )}

      <Box height={10} />
      <Text textAlign={['center', 'center', 'left']}>
        <Link href="/business/logout" passHref>
          <Text variant="h5" as="a" color="bluegrey.400">
            Logout
          </Text>
        </Link>
      </Text>
    </OwnerApp>
  )
}

const SubscriptionMessage: React.FC<WithOwnerProps> = ({ owner }) => {
  const status = React.useMemo(() => {
    if (owner.canUseForFree) return 'free'
    if (
      !owner.stripeSubscriptionStatus &&
      owner.trialEndsAt &&
      owner.trialEndsAt > new Date()
    ) {
      return 'trialing_internal'
    }
    return owner.stripeSubscriptionStatus
  }, [owner])

  if (status === 'free') {
    return (
      <Callout>
        <Text>
          Sie dürfen <strong>recover kostenlos</strong> nutzen.{' '}
          <span role="img" aria-label="Hurra!">
            🎉
          </span>
        </Text>
      </Callout>
    )
  }

  if (status === 'trialing_internal') {
    return (
      <Callout>
        <Text>
          Sie dürfen recover noch bis zum{' '}
          <strong>
            {formatDate(owner.trialEndsAt, 'DD.MM.YYYY')} kostenlos testen
          </strong>
          .
        </Text>
      </Callout>
    )
  }

  if (status === 'trialing') {
    return (
      <Callout>
        <Text>
          <strong>Sie sind im Probezeitraum Ihrer Mitgliedschaft.</strong>{' '}
          Danach wird Ihre Mitgliedschaft automatisch verlängert.
        </Text>
      </Callout>
    )
  }

  if (status === 'incomplete') {
    return (
      <Callout>
        <Text>Ihre Zahlung wird verarbeitet...</Text>
      </Callout>
    )
  }

  if (status === 'incomplete_expired') {
    return (
      <Callout variant="danger">
        <Text>
          Ihre Zahlung konnte nicht verarbeitet werden. Es wurden keine
          Zahlungen veranlasst. <strong>Bitte führe es erneut aus.</strong>
        </Text>
      </Callout>
    )
  }

  if (status === 'unpaid') {
    return (
      <Callout variant="danger">
        <Text>Ihre letzte Rechnung wurde noch nicht bezahlt.</Text>
      </Callout>
    )
  }

  if (status === 'canceled') {
    return (
      <Callout variant="danger">
        <Text>Sie haben Ihre Mitgliedschaft gekündigt.</Text>
      </Callout>
    )
  }

  return null
}

export default withOwner()(ProfilePage)
