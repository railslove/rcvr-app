import * as React from 'react'
import { useRouter } from 'next/router'
import AppLayout from '@ui/layouts/App'
import CardList from '@ui/blocks/CardList'

type CheckinProps = {}

const Checkin: React.FC<CheckinProps> = () => {
  const {
    query: { id },
  } = useRouter()

  React.useEffect(() => {
    console.log('visit', id)
  }, [id])

  return (
    <AppLayout>
      <CardList activeIndex={+id} />
    </AppLayout>
  )
}

export default Checkin
