import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'

import { checkin, checkout } from '@lib/actions'
import { useCurrentGuest } from '@lib/hooks/useCurrentGuest'
import { useArea } from '@lib/hooks/useArea'
import { Guest, updateGuest, addGuest, getLastCheckin } from '@lib/db'
import { MobileApp } from '@ui/layouts/MobileApp'
import { Onboarding } from '@ui/blocks/Onboarding'
import { Loading } from '@ui/blocks/Loading'

export default function CheckinPage() {
  const idRef = React.useRef<string>(uuidv4())
  const enteredAtRef = React.useRef<Date>(new Date())
  const [showOnboarding, setShowOnboarding] = React.useState(false)
  const [showLoading, setShowLoading] = React.useState(true)
  const router = useRouter()

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
        await checkout({ id: lastCheckin.id, leftAt: enteredAt })
      }

      const ticket = { id, publicKey, areaId, enteredAt }
      await checkin({ ticket, guest, companyId: areaInfo.data.companyId })

      router.replace('/my-checkins').then(() => window.scrollTo(0, 0))
    },
    [publicKey, areaId, areaInfo, router]
  )

  const handleSubmitOnboarding = React.useCallback(
    async (guest, opts) => {
      if (opts.rememberMe) {
        if (guestInfo.data) await updateGuest(guest)
        else await addGuest(guest)
      }

      checkinAndRedirect(guest)
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

    const guest = guestInfo.data

    // Check if a guest was already created, then do the checkin cha cha cha.
    if (guest) {
      const hasData = guest.name && guest.phone && guest.address
      const hasAcceptedPrivacy =
        guest.checkedInCompanyIds &&
        guest.checkedInCompanyIds.includes(areaInfo.data.companyId)

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
  }, [isReady, checkinAndRedirect, areaInfo, guestInfo])

  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">Checkin... | recover</title>
      </Head>
      <Loading show={showLoading} />
      {showOnboarding && <Onboarding onSubmit={handleSubmitOnboarding} />}
    </MobileApp>
  )
}
