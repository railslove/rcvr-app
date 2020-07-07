import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'
import { useMutation } from 'react-query'

import { binKey } from '~lib/crypto'
import { checkin, checkout } from '~lib/actions'
import { useCurrentGuest, useArea } from '~lib/hooks'
import { Guest, updateGuest, addGuest, getLastCheckin } from '~lib/db'
import { Row, Text, Box, Callout } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'
import { Onboarding } from '~ui/blocks/Onboarding'
import { Loading } from '~ui/blocks/Loading'

export default function CheckinPage() {
  const idRef = React.useRef<string>(uuidv4())
  const enteredAtRef = React.useRef<Date>(new Date())
  const [checkinFn, { error }] = useMutation(checkin, {
    throwOnError: true,
  })
  const [checkoutFn] = useMutation(checkout)
  const [showOnboarding, setShowOnboarding] = React.useState(false)
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

    const guest = guestInfo.data

    // Check if a guest was already created, then do the checkin cha cha cha.
    if (guest) {
      const hasData = guest.name && guest.phone && guest.address
      const hasAcceptedPrivacy = guest.checkedInCompanyIds?.includes(
        areaInfo.data.companyId
      )

      if (hasData && hasAcceptedPrivacy) {
        checkinAndRedirect(guest)
      } else {
        setShowOnboarding(true)
        setShowLoading(false)
      }
    } else {
      setShowOnboarding(true)
      setShowLoading(false)
    }
  }, [isReady, checkinAndRedirect, areaInfo, guestInfo, publicKey])

  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">Checkin... | recover</title>
      </Head>
      <Loading show={showLoading} />
      {showOnboarding && (
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
            <p>
              Durch die aktuellen Corona-Verordnungen müssen Sie Ihre
              Kontaktdaten hinterlegen, wenn Sie in einem Betrieb sind, der zu
              Schutzmaßnahmen verpflichtet ist, wie z.B Restaurants. Die App
              kann auch freiwillig genutzt werden, um die Nachverfolgung zu
              unterstützen.
            </p>
            <p>
              So kann das Gesundheitsamt Sie anrufen, wenn es notwendig ist.
            </p>
            <p>
              Datenschutz ist uns dabei sehr wichtig! <strong>recover</strong>{' '}
              speichert Ihre Daten verschlüsselt und sicher.
            </p>
          </Text>
          <Box height={6} />

          {error && (
            <Box mb={6} mx={-4}>
              <Callout variant="danger">
                <Text>
                  Wir konnten keine Verbindung herstellen. Haben Sie vielleicht
                  gerade kein Internet?
                </Text>
              </Callout>
            </Box>
          )}
          <Onboarding onSubmit={handleSubmitOnboarding} />
          <Row justifyContent="center" my={6}>
            <a
              href="https://www.recoverapp.de/fuer-gaeste"
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
