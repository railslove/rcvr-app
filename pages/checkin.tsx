import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { v4 as uuidv4 } from 'uuid'
import * as db from '@lib/db'
import * as api from '@lib/api'
import { Flex } from '@ui/base'
import Onboarding from '@ui/blocks/Onboarding'
import Loading from '@ui/blocks/Loading'
import AppLayout from '@ui/layouts/App'

const CheckingPage: React.FC<{}> = () => {
  const id = React.useRef<string>(uuidv4())
  const enteredAt = React.useRef<Date>(new Date())
  const router = useRouter()

  // query params can be arrays, we need to make sure they're strings
  const [publicKey, setPublicKey] = React.useState<string | undefined>()
  const [areaId, setAreaId] = React.useState<string | undefined>()

  React.useEffect(() => {
    // NORMALLY you would parse query strings using the URLSearchParams interface,
    // which is also used by nextjs' useRouter. BUT iOS Safari seems to have broken
    // URLSearchParams! Using URLSearchParams with iOS Safari will turn `+` into
    // whitespaces. This is pretty bad.
    // This wouldn't be a problem for us because our QR Codes are correctly encoded,
    // but some QR Code scanners first encode the URL params and then open Safari. (╯°□°）╯︵ ┻━┻
    // This solution uses a regex to parse the query string. That's not optimal.
    // But we don't have any other way to cover all those cases gracefully.
    const areaMatches = window.location.search.match(/\?a=([^&]*)/)
    const keyMatches = window.location.search.match(/&k=([^&]*)/)
    setAreaId(decodeURIComponent(areaMatches[1]))
    setPublicKey(decodeURIComponent(keyMatches[1]))
  }, [])

  const [doCheckin, { error }] = useMutation(api.createCheckin, {
    throwOnError: true,
  })
  const [doCheckout] = useMutation(api.checkoutTicket)

  const performCheckin = React.useCallback(
    async (guest: db.Guest) => {
      const lastCheckin = await db.getLastCheckin()

      if (lastCheckin && !lastCheckin.leftAt) {
        await doCheckout({ id: lastCheckin.id, leftAt: enteredAt.current })
      }

      await doCheckin({
        ticket: {
          publicKey,
          areaId,
          id: id.current,
          enteredAt: enteredAt.current,
        },
        guest,
      })
      router.replace('/my-checkins')
    },
    [doCheckin, doCheckout, publicKey, areaId, router]
  )

  // The loading spinner should only become visible after a small amount of time
  // to prevent it flashing up unnecessarily.
  const [isDelayedLoading, setIsDelayedLoading] = React.useState(false)
  const loadingTimeoutId = React.useRef<NodeJS.Timer>()
  React.useEffect(() => {
    loadingTimeoutId.current = setTimeout(() => {
      setIsDelayedLoading(true)
    }, 1000)

    return (): void => clearTimeout(loadingTimeoutId.current)
  }, [])

  const [showOnboarding, setShowOnboarding] = React.useState(false)
  const handleFinishOnboarding = React.useCallback(
    async (guest, opts) => {
      const timeoutId = setTimeout(() => setIsDelayedLoading(true), 400)
      if (opts.rememberMe) {
        await db.addGuest(guest)
      }
      setShowOnboarding(false)
      performCheckin(guest)
      clearTimeout(timeoutId)
      setIsDelayedLoading(false)
    },
    [performCheckin]
  )

  React.useEffect(() => {
    if (!publicKey || !areaId) return

    // Check if a guest was already created, then do the checkin cha cha cha.
    db.getGuest().then((guest) => {
      if (guest) {
        performCheckin(guest)
      } else {
        setShowOnboarding(true)
      }
    })
  }, [performCheckin, publicKey, areaId])

  const showLoading = isDelayedLoading && !showOnboarding && !error

  return (
    <AppLayout withTabs={false} withHeader={false}>
      <Head>
        <title key="title">Checkin... | recover</title>
      </Head>
      {showOnboarding && <Onboarding onFinish={handleFinishOnboarding} />}
      {showLoading && (
        <Flex flex={1} align="center" justify="center">
          <Loading />
        </Flex>
      )}
      {error && <div>{error.toString()}</div>}
    </AppLayout>
  )
}

export default CheckingPage
