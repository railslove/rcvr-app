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
  const publicKey = router.query.k?.toString()
  const areaId = router.query.a?.toString()

  const [doCheckin, { error }] = useMutation(api.createCheckin, {
    throwOnError: true,
  })
  const [doCheckout] = useMutation(api.checkoutTicket)

  const [area, setArea] = React.useState<api.AreaResponse>()
  React.useEffect(() => {
    areaId &&
      api.fetchArea(areaId).then((area) => {
        setArea(area)
      })
  }, [areaId])

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
      await db.setAcceptedPrivacy(area?.companyId)
      router.replace('/my-checkins')
    },
    [doCheckin, doCheckout, publicKey, areaId, router, area]
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
        const existingGuest = await db.getGuest()
        if (existingGuest) {
          await db.updateGuest(guest)
        } else {
          await db.addGuest(guest)
        }
      }

      setShowOnboarding(false)
      performCheckin(guest)
      clearTimeout(timeoutId)
      setIsDelayedLoading(false)
    },
    [performCheckin]
  )

  React.useEffect(() => {
    // Disallow empty data. This is the case on initial mount due to next's
    // static optimization
    if (!publicKey || !areaId || !area?.companyId) return

    // Check if a guest was already created, then do the checkin cha cha cha.
    db.getGuest().then((guest) => {
      if (
        guest &&
        guest.name &&
        guest.phone &&
        guest.address &&
        guest.acceptedPrivacy?.indexOf(area?.companyId) >= 0
      ) {
        performCheckin(guest)
      } else {
        setShowOnboarding(true)
      }
    })
  }, [performCheckin, publicKey, areaId, area])

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
