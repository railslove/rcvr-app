import * as React from 'react'
import Head from 'next/head'

import { useCheckins } from '@lib/hooks/useCheckins'
import { checkout } from '@lib/actions'

export default function MyCheckinsPage() {
  const checkinsInfo = useCheckins()

  const _handleCheckout = React.useCallback(async (checkin) => {
    await checkout({ id: checkin.id })
  }, [])

  return (
    <div>
      <Head>
        <title key="title">Meine Checkins | recover</title>
      </Head>
      {checkinsInfo.status === 'success' && checkinsInfo.data.length === 0 && (
        <div>Du hast noch keine Checkins.</div>
      )}
      {(checkinsInfo.data || []).map((checkin, i) => (
        <div key={checkin.id}>
          {i === 0 ? (
            <div>
              {checkinsInfo.status === 'success' && checkinsInfo.isFetching ? (
                <div>Loading...</div>
              ) : (
                <div>Latest checkin</div>
              )}
            </div>
          ) : (
            <div>Checkin</div>
          )}
        </div>
      ))}
    </div>
  )
}
