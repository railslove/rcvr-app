import { loadStripe } from '@stripe/stripe-js'
import formatDate from 'intl-dateformat'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { postOwnerCheckout, postOwnerSubscription } from '~lib/api'
import { isCareEnv, isFormal, isHealthEnv } from '~lib/config'
import { useCompanies, useModals } from '~lib/hooks'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { RECOVER_TEAM_EMAIL } from '~locales/constants'
import useLocale from '~locales/useLocale'
import { ArrowsRight } from '~ui/anicons'
import { ActionCard } from '~ui/blocks/ActionCard'
import { ActionList } from '~ui/blocks/ActionList'
import { Loading } from '~ui/blocks/Loading'
import { Box, Button, Callout, Divider, Text } from '~ui/core'
import { OwnerApp } from '~ui/layouts/OwnerApp'
import { CheckoutSelectionModal } from '~ui/modals/CheckoutSelectionModal'
import { OwnerModal } from '~ui/modals/OwnerModal'
import { SubscribedModal } from '~ui/modals/SubscribedModal'
import { Right } from '~ui/svg'
import { pricingInfoDuringTest } from '~ui/whitelabels'

const ProfilePage: React.FC<WithOwnerProps> = ({ owner }) => {
  const { t } = useLocale('pages/business/profile')

  const [redirecting, setRedirecting] = React.useState(false)
  const { data: companies } = useCompanies()
  const { query } = useRouter()
  const status = React.useMemo(() => {
    if (query.success?.toString() === 'true') return 'success'
  }, [query])

  const didOpenSuccessModal = React.useRef(false)
  const { modals, openModal } = useModals({
    checkoutSelection: CheckoutSelectionModal,
    success: SubscribedModal,
    editOwner: OwnerModal,
  })

  React.useEffect(() => {
    if (didOpenSuccessModal.current) return
    if (status === 'success') {
      didOpenSuccessModal.current = true
      openModal('success')
    }
  }, [status, openModal])

  const openStripeCheckout = React.useCallback(async () => {
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

  const openCheckout = () => {
    openModal('checkoutSelection', { openStripeCheckout })
  }

  const openEditOwner = () => {
    openModal('editOwner', { owner })
  }

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
    <OwnerApp title={t('pageTitle')}>
      {modals}
      <Loading show={redirecting} />

      <Button
        onClick={() => openEditOwner()}
        right={<ArrowsRight color="green" />}
      >
        {t('editProfile')}
      </Button>

      <Divider />
      <Text as="h3" variant="h2">
        {t('myMembership')}
      </Text>
      <Box height={4} />
      {hasCompanies ? (
        <SubscriptionMessage owner={owner} />
      ) : (
        <Callout>
          <Text>{t('hasNoCompaniesMessage')}</Text>
        </Callout>
      )}
      <Box height={4} />

      {!hasSubscription && hasCompanies && (
        <>
          <Text>{pricingInfoDuringTest}</Text>
          <Box height={4} />

          {isHealthEnv || isCareEnv ? (
            <Text>
              <p>{t('writeEmailMessage')}</p>
              <p>
                <a href={`mailto:${RECOVER_TEAM_EMAIL}`}>
                  <Button right={<ArrowsRight color="pink" />}>
                    {t('writeEmailButtonText')}
                  </Button>
                </a>
              </p>
            </Text>
          ) : (
            <Button
              onClick={() => openCheckout()}
              right={<ArrowsRight color="pink" />}
            >
              {t('upgradeNow')}
            </Button>
          )}
        </>
      )}

      {hasSubscription && !owner.canUseForFree && (
        <>
          <ActionList grid>
            <ActionCard onClick={() => openCheckout()}>
              <ActionCard.Main title="Zahlungsmethode ändern" icon={Right} />
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
            {isFormal ? 'Sie können ihre' : 'Du kannst Deine'} Mitgliedschaft
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
          {isFormal ? 'Sie können' : 'Du kannst'}{' '}
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
          {isFormal ? 'Sie können' : 'Du kannst'} recover noch bis zum{' '}
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
            {isFormal ? 'Sie sind' : 'Du bist'} im Probezeitraum deiner
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
        <Text>{isFormal ? 'Ihre' : 'Deine'} Zahlung wird verarbeitet...</Text>
      </Callout>
    )
  }

  if (status === 'incomplete_expired') {
    return (
      <Callout variant="danger">
        <Text>
          {isFormal ? 'Ihre' : 'Deine'} Zahlung konnte nicht verarbeitet werden.
          Es wurden keine Zahlungen veranlasst.{' '}
          <strong>Bitte erneut versuchen.</strong>
        </Text>
      </Callout>
    )
  }

  if (status === 'unpaid') {
    return (
      <Callout variant="danger">
        <Text>
          {isFormal ? 'Ihre' : 'Deine'} letzte Rechnung wurde noch nicht
          bezahlt.
        </Text>
      </Callout>
    )
  }

  if (status === 'canceled') {
    return (
      <Callout variant="danger">
        <Text>
          {isFormal ? 'Sie haben ihre' : 'Du hast Deine'} Mitgliedschaft
          gekündigt.
        </Text>
      </Callout>
    )
  }

  return null
}

export default withOwner()(ProfilePage)
