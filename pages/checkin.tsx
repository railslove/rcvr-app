import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'
import { useMutation } from 'react-query'

import { isCareEnv, isFormal, isHealthEnv, isRcvrEnv } from '~lib/config'
import { introText, formalAddress } from '~ui/whitelabels'
import { binKey } from '~lib/crypto'
import { checkin, checkout } from '~lib/actions'
import { useCurrentGuest, useArea } from '~lib/hooks'
import { Guest, updateGuest, addGuest, getLastCheckin } from '~lib/db'
import { Row, Text, Box, Callout, Card } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'
import { Onboarding } from '~ui/blocks/Onboarding'
import { Confirmation } from '~ui/blocks/Confirmation'
import { Loading } from '~ui/blocks/Loading'

export default function CheckinPage() {
  const idRef = React.useRef<string>(uuidv4())
  const enteredAtRef = React.useRef<Date>(new Date())
  const [checkinFn, { error }] = useMutation(checkin, {
    throwOnError: true,
  })
  const [checkoutFn] = useMutation(checkout)
  const [showOnboarding, setShowOnboarding] = React.useState(false)
  const [showConfirmation, setShowConfirmation] = React.useState(false)
  const [showLoading, setShowLoading] = React.useState(true)
  const router = useRouter()

  if (error && !(error instanceof TypeError)) {
    // Something went very wrong during the checkin and we can't
    // recover ( ☜(ﾟヮﾟ☜) ayyyy) from it
    throw error
  }

  const publicKey = router.query.k?.toString()
  const areaId = router.query.a?.toString()

  const guestInfo = useCurrentGuest()
  const areaInfo = useArea(areaId)

  const prefillName = router.query.name?.toString()
  const prefillPhone = router.query.phone?.toString()
  const prefillAddress = router.query.address?.toString()

  const prefilledGuest =
    prefillName ||
    prefillPhone ||
    prefillAddress ||
    guestInfo.data?.name ||
    guestInfo.data?.phone ||
    guestInfo.data?.address
      ? {
          name: prefillName || guestInfo.data?.name,
          phone: prefillPhone || guestInfo.data?.phone,
          address: prefillAddress || guestInfo.data?.address,
        }
      : undefined

  React.useEffect(() => {
    if (!areaInfo?.data?.frontendUrl) return

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
        await checkoutFn({ id: lastCheckin.id, leftAt: enteredAt })
      }

      try {
        const ticket = { id, publicKey, areaId, enteredAt }
        await checkinFn({ ticket, guest, companyId: areaInfo.data.companyId })
        router.replace('/my-checkins').then(() => window.scrollTo(0, 0))
      } catch (error) {
        if (error instanceof TypeError) {
          setShowLoading(false)
          setShowOnboarding(true)
        }
      }
    },
    [publicKey, areaId, areaInfo, router, checkinFn, checkoutFn]
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

  const tryAutoCheckin = React.useCallback(() => {
    const guest = guestInfo.data

    // Check if a guest was already created
    const hasData = guest?.name && guest?.phone && guest?.address
    // and has already checked in at this company before
    const hasAcceptedPrivacy = guest?.checkedInCompanyIds?.includes(
      areaInfo.data.companyId
    )

    // then do the checkin cha cha cha.
    if (hasData && hasAcceptedPrivacy) {
      checkinAndRedirect(guest)
    } else {
      setShowConfirmation(false)
      setShowOnboarding(true)
      setShowLoading(false)
    }
  }, [guestInfo, areaInfo, checkinAndRedirect])

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
      tryAutoCheckin()
    }
  }, [isReady, publicKey, tryAutoCheckin])

  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">Checkin... | recover</title>
      </Head>
      <Loading show={showLoading} />
      {areaInfo.data?.ownerIsBlocked && (
        <div>
          <Text as="h2" variant="h2">
            {areaInfo.data.companyName}
          </Text>
          <Box height={5} />
          <Callout variant="danger">
            <Text>
              Die Kontaktdatenerfassung mit recover ist für diesen Betrieb
              leider nicht mehr aktiv. Bitte{' '}
              {formalAddress ? 'fragen Sie' : 'frag'} vor Ort nach einer anderen
              Art der Kontaktdatenerfassung.
            </Text>
          </Callout>
        </div>
      )}
      {!areaInfo.data?.ownerIsBlocked && (showOnboarding || showConfirmation) && (
        <div>
          <Text as="h2" variant="h2">
            {areaInfo.data.companyName}
          </Text>
          <Box height={5} />
          <Text as="h3" variant="h5">
            Willkommen!
          </Text>
          <Box height={1} />
          <Text>
            <p>{introText}</p>
            <p>
              {formalAddress
                ? 'So kann das Gesundheitsamt Sie anrufen, wenn es notwendig ist.'
                : 'So kann das Gesundheitsamt Dich anrufen, wenn es notwendig ist.'}
            </p>
            <p>
              Datenschutz ist uns dabei sehr wichtig!{' '}
              {isRcvrEnv ? (
                <>
                  <strong>recover</strong> speichert Deine Daten verschlüsselt
                  und sicher.
                </>
              ) : (
                'Ihre Daten werden verschlüsselt und sicher gespeichert.'
              )}
            </p>
          </Text>
          <Box height={6} />

          {error && (
            <Box mb={6} mx={-4}>
              <Callout variant="danger">
                <Text>
                  {isFormal
                    ? 'Wir konnten keine Verbindung herstellen. Haben Sie vielleicht gerade kein Internet?'
                    : 'Wir konnten keine Verbindung herstellen. Hast du vielleicht gerade kein Internet?'}
                </Text>
              </Callout>
            </Box>
          )}
          {showOnboarding && (
            <Card variant="form" mx={-4}>
              <Onboarding
                onSubmit={handleSubmitOnboarding}
                prefilledGuest={prefilledGuest}
              />
            </Card>
          )}
          {showConfirmation && <Confirmation onSubmit={tryAutoCheckin} />}
          <Row justifyContent="center" my={6}>
            <a
              href={
                isCareEnv
                  ? 'https://www.recovercare.de/fur-besucher'
                  : isHealthEnv
                  ? 'https://www.recover-health.de/fur-besucher'
                  : 'https://www.recoverapp.de/fuer-gaeste'
              }
              target="_blank"
              rel="noreferrer noopener"
            >
              <Text variant="link">Wie funktioniert recover?</Text>
            </a>
          </Row>
        </div>
      )}
    </MobileApp>
  )
}
