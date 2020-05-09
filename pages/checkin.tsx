import * as React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { v4 as uuidv4 } from 'uuid'
import * as db from '@lib/db'
import Onboarding from '@ui/blocks/Onboarding'

type CheckingPageProps = {}

type CreateCheckinData = {
  id: string
  businessId: string
  key: string
  place: string
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

const CheckingPage: React.FC<CheckingPageProps> = () => {
  const id = React.useRef<string>(uuidv4())
  const { query } = useRouter()
  const key = Array.isArray(query.key) ? undefined : query.key
  const businessId = Array.isArray(query.business) ? undefined : query.business
  const place = Array.isArray(query.place) ? undefined : query.place

  const [showOnboarding, setShowOnboarding] = React.useState(false)
  const [doCheckin, { status, data }] = useMutation(createCheckin)
  const isIdle = status === 'idle' && !showOnboarding

  const performCheckin = React.useCallback(() => {
    doCheckin({ key, businessId, place, id: id.current })
  }, [doCheckin, key, businessId, place])

  const handleFinishOnboarding = React.useCallback(
    async (data) => {
      await db.addGuest(data)
      setShowOnboarding(false)
      performCheckin()
    },
    [performCheckin]
  )

  React.useEffect(() => {
    // Disallow empty data. This is the case on initial mount due to next's
    // static optimization
    if (!key || !businessId || !place) return

    db.getGuest().then((guest) => {
      if (guest) {
        performCheckin()
      } else {
        setShowOnboarding(true)
      }
    })
  }, [performCheckin, key, businessId, place])

  return (
    <div>
      {isIdle && 'Loading...'}
      {showOnboarding && <Onboarding onFinish={handleFinishOnboarding} />}
      {status === 'loading' && 'Creating new Checkin...'}
      {status === 'success' && 'Dummy checked in ' + JSON.stringify(data)}
    </div>
  )
}

export default CheckingPage
