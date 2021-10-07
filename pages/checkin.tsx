import * as React from 'react'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'
import { useMutation, useQueryClient } from 'react-query'

import { isFormal, isRcvrEnv } from '~lib/config'
import usePageLocale from '~locales/usePageLocale'
import { binKey } from '~lib/crypto'
import { checkin, checkout } from '~lib/actions'
import { useCurrentGuest, useArea } from '~lib/hooks'
import { Guest, updateGuest, addGuest, getLastCheckin } from '~lib/db'
import { Row, Text, Box, Callout, Card } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'
import { Onboarding } from '~ui/blocks/Onboarding/Onboarding'
import { Confirmation } from '~ui/blocks/Confirmation/Confirmation'
import { Loading } from '~ui/blocks/Loading'

export default function CheckinPage() {
  const { t } = usePageLocale('checkin')

  const idRef = React.useRef<string>(uuidv4())
  const enteredAtRef = React.useRef<Date>(new Date())
  const mutationCheckin = useMutation(checkin)
  const mutationCheckout = useMutation(checkout)
  const [showOnboarding, setShowOnboarding] = React.useState(false)
  const [showConfirmation, setShowConfirmation] = React.useState(false)
  const [showLoading, setShowLoading] = React.useState(true)
  const router = useRouter()
  const queryClient = useQueryClient()

  if (mutationCheckin.error && !(mutationCheckin.error instanceof TypeError)) {
    // Something went very wrong during the checkin and we can't
    // recover ( ☜(ﾟヮﾟ☜) ayyyy) from it
    throw mutationCheckin.error
  }

  const publicKey = router.query.k?.toString()
  const areaId = router.query.a?.toString()
  const cwaSeed = router.query.cwa?.toString()

  const guestInfo = useCurrentGuest()
  const areaInfo = useArea(areaId)

  const prefillName = router.query.name?.toString()
  const prefillPhone = router.query.phone?.toString()
  const prefillAddress = router.query.address?.toString()
  const prefillCity = router.query.city?.toString()
  const prefillPostalCode = router.query.postalCode?.toString()

  const prefilledGuest =
    prefillName ||
    prefillPhone ||
    prefillAddress ||
    prefillCity ||
    prefillPostalCode ||
    guestInfo.data?.name ||
    guestInfo.data?.phone ||
    guestInfo.data?.address ||
    guestInfo.data?.city ||
    guestInfo.data?.postalCode
      ? {
          name: prefillName || guestInfo.data?.name || '',
          phone: prefillPhone || guestInfo.data?.phone || '',
          address: prefillAddress || guestInfo.data?.address || '',
          city: prefillCity || guestInfo.data?.city || '',
          postalCode: prefillPostalCode || guestInfo.data?.postalCode || '',
        }
      : undefined

  React.useEffect(() => {
    if (!areaInfo?.data?.frontendUrl) return

    // NOTE: allows testing /checkin URLs in localhost
    if (process.env.NODE_ENV === 'development') {
      return
    }

    const url = new URL(areaInfo.data.frontendUrl)

    if (window.location.origin === url.origin) return

    url.pathname = window.location.pathname
    url.search = window.location.search

    window.location.replace(url.toString())
  }, [areaInfo])

  const checkinAndRedirect = React.useCallback(
    async (guest: Guest) => {
      const id = idRef.current
      const enteredAt = enteredAtRef.current
      setShowLoading(true)

      // auto checkout
      const lastCheckin = await getLastCheckin()
      if (lastCheckin && !lastCheckin.leftAt) {
        await mutationCheckout.mutateAsync({
          queryClient,
          checkin: {
            id: lastCheckin.id,
            leftAt: enteredAt,
          },
        })
      }

      try {
        const ticket = { id, publicKey, areaId, enteredAt }
        await mutationCheckin.mutateAsync({
          ticket,
          guest,
          companyId: areaInfo.data?.companyId,
          cwaSeed,
        })
        router.replace('/my-checkins').then(() => window.scrollTo(0, 0))
      } catch (error) {
        if (error instanceof TypeError) {
          setShowLoading(false)
          setShowOnboarding(true)
        }
      }
    },
    [
      publicKey,
      areaId,
      areaInfo,
      router,
      mutationCheckin,
      mutationCheckout,
      queryClient,
      cwaSeed,
    ]
  )

  const handleSubmitOnboarding = React.useCallback(
    async (guest, opts) => {
      if (opts.rememberMe) {
        if (guestInfo.data) await updateGuest(guest)
        else await addGuest(guest)
      }

      await checkinAndRedirect(guest)
    },
    [guestInfo, checkinAndRedirect]
  )

  const confirmedScreen = React.useCallback(() => {
    setShowConfirmation(false)
    setShowOnboarding(true)
    setShowLoading(false)
  }, [setShowConfirmation, setShowOnboarding, setShowLoading])

  const isReady =
    publicKey &&
    areaId &&
    areaInfo.status === 'success' &&
    guestInfo.status === 'success'

  const hasStarted = React.useRef<boolean>(false)
  React.useEffect(() => {
    if (!isReady) return

    // Make sure this hook only executes once from here on
    if (hasStarted.current) return
    hasStarted.current = true

    // Checks if the publicKey is decodable. Throws an error and shows the
    // corresponding error page if not.
    binKey(publicKey)
    if (isFormal) {
      setShowConfirmation(true)
      setShowLoading(false)
    } else {
      setShowConfirmation(false)
      setShowOnboarding(true)
      setShowLoading(false)
    }
  }, [isReady, publicKey])

  if (areaInfo.data == null) {
    return (
      <MobileApp pageTitle={t('pageTitle')} logoVariant="big">
        <Loading show />
      </MobileApp>
    )
  }

  return (
    <MobileApp
      pageTitle={t('pageTitle')}
      logoVariant="big"
      secondaryLogo={areaInfo.data.affiliateLogo}
    >
      <Loading show={showLoading} />
      {areaInfo.data.ownerIsBlocked && (
        <div>
          <Text as="h2" variant="h2">
            {areaInfo.data.companyName}
          </Text>
          <Box height={5} />
          <Callout variant="danger">
            <Text>{t('ownerIsBlockedMessage')}</Text>
          </Callout>
        </div>
      )}
      {!areaInfo.data.ownerIsBlocked && (showOnboarding || showConfirmation) && (
        <div>
          <Text as="h2" variant="h2">
            {areaInfo.data.companyName}
          </Text>
          <Box height={5} />
          <Text as="h3" variant="h5">
            {t('welcome')}
          </Text>
          <Box height={1} />
          <Text>
            <p>{t('introText')}</p>
            <p>{t('address')}</p>
            <p>
              {t('dataProtection1')}
              {isRcvrEnv ? ' ' : null}
              {isRcvrEnv ? <b>recover</b> : null}
              {isRcvrEnv ? ' ' : null}
              {isRcvrEnv ? t('dataProtection2_rcvr') : t('dataProtection2')}
            </p>
          </Text>
          <Box height={6} />

          {mutationCheckin.error && (
            <Box mb={6} mx={-4}>
              <Callout variant="danger">
                <Text>{t('checkinError')}</Text>
              </Callout>
            </Box>
          )}
          {showOnboarding && (
            <Card variant="form" mx={-4}>
              <Onboarding
                area={areaInfo.data}
                onSubmit={handleSubmitOnboarding}
                prefilledGuest={prefilledGuest}
              />
              {areaInfo.data.privacyPolicyLink && (
                <>
                  <Box height={4} />
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    href={areaInfo.data.privacyPolicyLink}
                  >
                    <Text variant="link">
                      {t('privacyPolicyLink')} {areaInfo.data.companyName}
                    </Text>
                  </a>
                </>
              )}
            </Card>
          )}

          {showConfirmation && <Confirmation onSubmit={confirmedScreen} />}
          <Row justifyContent="center" my={6}>
            <a
              href={t('howDoesItWorkLink')}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Text variant="link">{t('howDoesItWorkText')}</Text>
            </a>
          </Row>
        </div>
      )}
    </MobileApp>
  )
}
