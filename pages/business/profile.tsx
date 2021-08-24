import { loadStripe } from '@stripe/stripe-js'
import formatDate from 'intl-dateformat'
import Link from '~ui/core/Link/Link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { postOwnerCheckout, postOwnerSubscription } from '~lib/api'
import { isCareEnv, isHealthEnv } from '~lib/config'
import { useCompanies, useModals } from '~lib/hooks'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import usePageLocale from '~locales/usePageLocale'
import { ArrowsRight } from '~ui/anicons'
import { ActionCard } from '~ui/blocks/ActionCard/ActionCard'
import { ActionList } from '~ui/blocks/ActionList'
import { Loading } from '~ui/blocks/Loading'
import { Box, Button, Callout, Divider, Text } from '~ui/core'
import { OwnerApp } from '~ui/layouts/OwnerApp/OwnerApp'
import {
  CheckoutSelectionModal,
  CheckoutSelectionModalProps,
} from '~ui/modals/CheckoutSelectionModal'
import { OwnerFormProps, OwnerModal } from '~ui/modals/OwnerModal'
import { SubscribedModal } from '~ui/modals/SubscribedModal'
import { Right } from '~ui/svg'
import { BUILD_VARIANT } from '~ui/whitelabels'
import RecoverTeamEmailLink from '~ui/core/Link/RecoverTeamEmailLink'

const PricingInfoDuringTest: React.FC = () => {
  const { t } = usePageLocale('business/profile')

  switch (BUILD_VARIANT) {
    case 'care': {
      return <p>{t('pricingInfo_care')}</p>
    }
    case 'health': {
      return (
        <>
          <p>{t('pricingInfo_health1')}</p>
          <p>{t('pricingInfo_health2')}</p>
        </>
      )
    }
    case 'fresenius': {
      return (
        <p>
          {t('pricingInfo_fresenius1')}
          <br />
          {t('pricingInfo_fresenius2')}
          <br />
          {t('pricingInfo_fresenius3')}: <RecoverTeamEmailLink />
        </p>
      )
    }
    default: {
      return (
        <p>
          {t('pricingInfo_rcvr1')}
          <br />
          <br />
          {t('pricingInfo_rcvr2')}
          <br />
          <br />
          {t('pricingInfo_rcvr3')}: <RecoverTeamEmailLink />
          <RecoverTeamEmailLink />
          <br />
          <br />
          {t('pricingInfo_rcvr4')}:{' '}
          <RecoverTeamEmailLink subject={t('pricingInfoEmailSubject_rcvr')} />
        </p>
      )
    }
  }
}

const ProfilePage: React.FC<WithOwnerProps> = ({ owner }) => {
  const { t, lang } = usePageLocale('business/profile')

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
    const props: CheckoutSelectionModalProps = {
      locales: {
        title: t('checkoutSelectionModalTitle'),
        stripeButtonText: t('checkoutSelectionModalStripeButtonText'),
        sepaDebitButtonText: t('checkoutSelectionModalSepaButtonText'),
      },
      openStripeCheckout,
    }

    openModal('checkoutSelection', props as any)
  }

  const openEditOwner = () => {
    const props: OwnerFormProps = {
      lang,
      owner,
      locales: {
        nameLabel: t('nameLabel'),
        nameRequired: t('nameRequired'),
        phoneLabel: t('phoneLabel'),
        phoneInvalid: t('phoneInvalid'),
        phoneRequired: t('phoneRequired'),
        cityLabel: t('cityLabel'),
        cityRequired: t('cityRequired'),
        streetLabel: t('streetLabel'),
        streetRequired: t('streetRequired'),
        zipLabel: t('zipLabel'),
        zipRequired: t('zipRequired'),
        companyNameLabel: t('companyNameLabel'),
        companyNameRequired: t('companyNameRequired'),
        /**/
        editProfile: t('editProfile'),
        submitButton: t('ownerModalSubmitButton'),
      },
    }

    openModal('editOwner', props as any)
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
          <Text>
            <PricingInfoDuringTest />
          </Text>
          <Box height={4} />

          {isHealthEnv || isCareEnv ? (
            <Text>
              <p>{t('writeEmailMessage')}</p>
              <p>
                <RecoverTeamEmailLink>
                  <Button right={<ArrowsRight color="pink" />}>
                    {t('writeEmailButtonText')}
                  </Button>
                </RecoverTeamEmailLink>
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
              <ActionCard.Main
                title={t('hasSubscriptionNotForFreeCardTitle1')}
                icon={Right}
              />
            </ActionCard>
          </ActionList>

          <Divider />

          <ActionList grid>
            <ActionCard onClick={openSelfService}>
              <ActionCard.Main
                title={t('hasSubscriptionNotForFreeCardTitle2')}
                icon={Right}
              />
            </ActionCard>
            <div />
          </ActionList>
          <Box height={4} />
          <Text variant="shy">{t('hasSubscriptionNotForFreeMessage')}</Text>
        </>
      )}

      <Box height={10} />
      <Text textAlign={['center', 'center', 'left']}>
        <Link href="/business/logout" passHref>
          <Text variant="h5" as="a" color="bluegrey.400">
            {t('logout')}
          </Text>
        </Link>
      </Text>
    </OwnerApp>
  )
}

const SubscriptionMessage: React.FC<WithOwnerProps> = ({ owner }) => {
  const { t } = usePageLocale('business/profile')

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
          {t('freeSub1')} <strong>{t('freeSub2')}</strong> {t('freeSub3')}.{' '}
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
          {t('trialing_internal1')}{' '}
          <strong>
            {formatDate(owner.trialEndsAt, 'DD.MM.YYYY')}{' '}
            {t('trialing_internal2')}
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
          <strong>{t('trialing1')}.</strong> {t('trialing2')}.
        </Text>
      </Callout>
    )
  }

  if (status === 'incomplete') {
    return (
      <Callout>
        <Text>{t('incomplete')}</Text>
      </Callout>
    )
  }

  if (status === 'incomplete_expired') {
    return (
      <Callout variant="danger">
        <Text>
          {t('incomplete_expired1')} <strong>{t('incomplete_expired2')}</strong>
        </Text>
      </Callout>
    )
  }

  if (status === 'unpaid') {
    return (
      <Callout variant="danger">
        <Text>{t('unpaid')}</Text>
      </Callout>
    )
  }

  if (status === 'canceled') {
    return (
      <Callout variant="danger">
        <Text>{t('cancelled')}</Text>
      </Callout>
    )
  }

  return null
}

export default withOwner()(ProfilePage)
