import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'

import { checkin, checkout } from '@lib/actions'
import { useCurrentGuest } from '@lib/hooks/useCurrentGuest'
import { useArea } from '@lib/hooks/useArea'
import * as db from '@lib/db'
import Onboarding from '@ui/blocks/Onboarding'

export default function CheckinPage() {
  const idRef = React.useRef<string>(uuidv4())
  const enteredAtRef = React.useRef<Date>(new Date())
  const isProcessing = React.useRef<boolean>(false)
  const [showOnboarding, setShowOnboarding] = React.useState(false)
  const router = useRouter()

  const publicKey = router.query.k?.toString()
  const areaId = router.query.a?.toString()

  const guestInfo = useCurrentGuest()
  const areaInfo = useArea(areaId)

  const checkinAndRedirect = React.useCallback(
    async (guest: db.Guest) => {
      const id = idRef.current
      const enteredAt = enteredAtRef.current

      // auto checkout
      const lastCheckin = await db.getLastCheckin()
      if (lastCheckin && !lastCheckin.leftAt) {
        await checkout({ id: lastCheckin.id, leftAt: enteredAt })
      }

      const ticket = { id, publicKey, areaId, enteredAt }
      await checkin({ ticket, guest, companyId: areaInfo.data.companyId })

      router.replace('/my-checkins')
    },
    [publicKey, areaId, areaInfo, router]
  )

  const handleSubmitOnboarding = React.useCallback(
    async (guest, opts) => {
      if (opts.rememberMe) {
        if (guestInfo.data) await db.updateGuest(guest)
        else await db.addGuest(guest)
      }

      setShowOnboarding(false)
      checkinAndRedirect(guest)
    },
    [guestInfo, checkinAndRedirect]
  )

  const isInitializing =
    !publicKey ||
    !areaId ||
    areaInfo.status === 'loading' ||
    guestInfo.status === 'loading'

  React.useEffect(() => {
    if (isInitializing) return

    // Make sure this hook only executes once from here on
    if (isProcessing.current) return
    isProcessing.current = true

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
      }
    } else {
      setShowOnboarding(true)
    }
  }, [isInitializing, checkinAndRedirect, areaInfo, guestInfo])

  return (
    <div>
      <Head>
        <title key="title">Checkin... | recover</title>
      </Head>
      {!showOnboarding && <div>Loading!</div>}
      {showOnboarding && <Onboarding onSubmit={handleSubmitOnboarding} />}
    </div>
  )
}
