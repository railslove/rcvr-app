import * as React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import formatDate from 'intl-dateformat'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { isCareEnv } from '~lib/config'
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
          <Text>
            {isCareEnv ? 'Sie müssen' : 'Du musst'} zuerst einen Betrieb
            anlegen.
          </Text>
        </Callout>
      )}
      <Box height={4} />

      {!hasSubscription && hasCompanies && (
        <>
          <Text>
            <p>
              {isCareEnv ? 'Sie dürfen' : 'Du darfst'} recover 14 Tage lang
              kostenlos auf Herz und Nieren testen.
              <br />
              Danach kostet die Mitgliedschaft {isCareEnv
                ? '29.90€'
                : '15€'}{' '}
              inkl. USt. pro Monat und
              {isCareEnv ? 'Pflegeeinrichtung' : 'Betrieb'}. Die Mitgliedschaft
              kann jederzeit zum Monatsende gekündigt werden.
              {!isCareEnv && (
                <>
                  <br />
                  Wenn Du Anspruch auf eine kostenlose oder reduzierte Nutzung
                  von der Recover App hast, melde dich gerne bei unserem
                  Support, damit wir deinen Laden überprüfen und freischalten
                  können:{' '}
                  <a href="mailto:team@recoverapp.de">team@recoverapp.de</a>
                </>
              )}
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
              <ActionCard.Main title="Rechnungen" icon={Right} />
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
            {isCareEnv ? 'Sie können ihre' : 'Du kannst deine'} Mitgliedschaft
            jederzeit zum Monatsende kündigen.
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
          {isCareEnv ? 'Sie dürfen' : 'Du darfst'}{' '}
          <strong>recover kostenlos</strong> nutzen.{' '}
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
          {isCareEnv ? 'Sie dürfen' : 'Du darfst'} recover noch bis zum{' '}
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
          <strong>
            {isCareEnv ? 'Sie sind' : 'Du bist'} im Probezeitraum deiner
            Mitgliedschaft.
          </strong>{' '}
          Danach wird die Mitgliedschaft automatisch verlängert.
        </Text>
      </Callout>
    )
  }

  if (status === 'incomplete') {
    return (
      <Callout>
        <Text>{isCareEnv ? 'Ihre' : 'Deine'} Zahlung wird verarbeitet...</Text>
      </Callout>
    )
  }

  if (status === 'incomplete_expired') {
    return (
      <Callout variant="danger">
        <Text>
          {isCareEnv ? 'Ihre' : 'Deine'} Zahlung konnte nicht verarbeitet
          werden. Es wurden keine Zahlungen veranlasst.{' '}
          <strong>Bitte erneut versuchen.</strong>
        </Text>
      </Callout>
    )
  }

  if (status === 'unpaid') {
    return (
      <Callout variant="danger">
        <Text>
          {isCareEnv ? 'Ihre' : 'Deine'} letzte Rechnung wurde noch nicht
          bezahlt.
        </Text>
      </Callout>
    )
  }

  if (status === 'canceled') {
    return (
      <Callout variant="danger">
        <Text>
          {isCareEnv ? 'Sie haben ihre' : 'Du hast deine'} Mitgliedschaft
          gekündigt.
        </Text>
      </Callout>
    )
  }

  return null
}

export default withOwner()(ProfilePage)
