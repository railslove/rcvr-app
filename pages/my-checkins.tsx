import * as React from 'react'
import { useQuery } from 'react-query'
import * as db from '@lib/db'

const MyCheckinsPage: React.FC<{}> = () => {
  const { data: checkins = [], status } = useQuery(
    'checkins',
    db.getAllCheckins
  )

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'error') return <div>Error!</div>

  return (
    <ul>
      {checkins.map((checkin) => (
        <li key={checkin.id}>
          {checkin.business} – {checkin.enteredAt.toISOString()} –{' '}
          {checkin.leftAt?.toISOString()}
        </li>
      ))}
    </ul>
  )
}

export default MyCheckinsPage
