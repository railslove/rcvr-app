import * as React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import formatDate from 'intl-dateformat'
import Link from 'next/link'

import { useCompanies } from '~lib/hooks'
import { postOwnerCheckout, postOwnerSubscription } from '~lib/api'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { Box, Button, Text, Divider, Callout } from '~ui/core'
import { Right } from '~ui/svg'
import { ArrowsRight } from '~ui/anicons'
import { OwnerApp } from '~ui/layouts/OwnerApp'
import { Loading } from '~ui/blocks/Loading'
import { ActionList } from '~ui/blocks/ActionList'
import { ActionCard } from '~ui/blocks/ActionCard'

const ProfilePage: React.FC<WithOwnerProps> = ({ owner }) => {
  const [redirecting, setRedirecting] = React.useState(false)
  const { data: companies } = useCompanies()

  const openCheckout = React.useCallback(async () => {
    try {
      setRedirecting(true)
      const stripe = await loadStripe(process.env.stripePublishableKey)
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
          <Text>Du musst zuerst einen Betrieb anlegen.</Text>
        </Callout>
      )}
      <Box height={4} />

      {!hasSubscription && hasCompanies && (
        <>
          <Text>
            <p>
              Du darfst recover 14 Tage lang kostenlos auf Herz und Nieren
              testen.
              <br />
              Danach kostet die Mitgliedschaft 15€ zzgl. USt. pro Monat und
              Betrieb. Du kannst deine Mitgliedschaft jederzeit zum Monatsende
              kündigen.
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
              <ActionCard.Main title="Deine Rechnungen" icon={Right} />
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
            Du kannst deine Mitgliedschaft jederzeit zum Monatsende kündigen.
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

  if (status === 'free')
    return (
      <Callout>
        <Text>
          Du darfst <strong>recover kostenlos</strong> nutzen.{' '}
          <span role="img" aria-label="Hurra!">
            🎉
          </span>
        </Text>
      </Callout>
    )

  if (status === 'active')
    return (
      <Callout>
        <Text>
          <strong>Deine Mitgliedschaft ist aktiv.</strong>{' '}
          <span role="img" aria-label="Hurra!">
            🎉
          </span>{' '}
          Wir freuen uns, dass du recover nutzt!
        </Text>
      </Callout>
    )

  if (status === 'trialing_internal')
    return (
      <Callout>
        <Text>
          Du darfst recover noch bis zum{' '}
          <strong>
            {formatDate(owner.trialEndsAt, 'DD.MM.YYYY')} kostenlos testen
          </strong>
          .
        </Text>
      </Callout>
    )

  if (status === 'trialing')
    return (
      <Callout>
        <Text>
          <strong>Du bist im Probezeitraum deiner Mitgliedschaft.</strong>
        </Text>
      </Callout>
    )

  if (status === 'incomplete')
    return (
      <Callout>
        <Text>Deine Zahlung wird gerade verarbeitet...</Text>
      </Callout>
    )

  if (status === 'incomplete_expired')
    return (
      <Callout variant="danger">
        <Text>
          Deine Zahlung konnte nicht verarbeitet werden. Es wurden keine
          Zahlungen veranlasst. <strong>Bitte führe es erneut aus.</strong>
        </Text>
      </Callout>
    )

  if (status === 'unpaid')
    return (
      <Callout variant="danger">
        <Text>Deine letzte Rechnung wurde noch nicht bezahlt.</Text>
      </Callout>
    )

  if (status === 'canceled')
    return (
      <Callout variant="danger">
        <Text>Du hast deine Mitgliedschaft gekündigt.</Text>
      </Callout>
    )
}

export default withOwner()(ProfilePage)
