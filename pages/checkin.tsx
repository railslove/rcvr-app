import * as React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { v4 as uuidv4 } from 'uuid'
import * as db from '@lib/db'
import { Flex } from '@ui/base'
import Onboarding from '@ui/blocks/Onboarding'
import Loading from '@ui/blocks/Loading'
import AppLayout from '@ui/layouts/App'

type CreateCheckinData = {
  id: string
  businessId?: string
  key?: string
  place?: string
}

async function createCheckin(data: CreateCheckinData): Promise<db.Checkin> {
  const guest = await db.getGuest()
  const enteredAt = new Date()
  // here be dragons: crypto & request
  console.log('dummy request with', { data, guest })
  const checkin = await db.addCheckin({
    id: data.id,
    business: 'Business with id ' + data.businessId,
    enteredAt,
  })
  return checkin
}

const CheckingPage: React.FC<{}> = () => {
  const id = React.useRef<string>(uuidv4())
  const router = useRouter()

  // query params can be array, we need to be sure they're strings
  const key = router.query.key?.toString()
  const businessId = router.query.business?.toString()
  const place = router.query.place?.toString()

  const [doCheckin, { status, error }] = useMutation(createCheckin, {
    throwOnError: true,
  })
  const performCheckin = React.useCallback(async () => {
    await doCheckin({ key, businessId, place, id: id.current })
    router.replace('/my-checkins')
  }, [doCheckin, key, businessId, place, router])

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
    async (data) => {
      const timeoutId = setTimeout(() => setIsDelayedLoading(true), 400)
      await db.addGuest(data)
      setShowOnboarding(false)
      performCheckin()
      clearTimeout(timeoutId)
      setIsDelayedLoading(false)
    },
    [performCheckin]
  )

  React.useEffect(() => {
    // Disallow empty data. This is the case on initial mount due to next's
    // static optimization
    if (!key || !businessId || !place) return

    // Check if a guest was already created, then do the checkin cha cha cha.
    db.getGuest().then((guest) => {
      if (guest) {
        performCheckin()
      } else {
        setShowOnboarding(true)
      }
    })
  }, [performCheckin, key, businessId, place])

  const showLoading = isDelayedLoading && !showOnboarding && status !== 'error'

  return (
    <AppLayout withTabs={false} withHeader={false}>
      {showOnboarding && <Onboarding onFinish={handleFinishOnboarding} />}
      {showLoading && (
        <Flex flex={1} align="center" justify="center">
          <Loading />
        </Flex>
      )}
      {status === 'error' && <div>{error.toString()}</div>}
    </AppLayout>
  )
}

export default CheckingPage
