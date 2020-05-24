import * as React from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'

import { useArea } from '@lib/hooks/useArea'
import { useCheckins } from '@lib/hooks/useCheckins'
import { useCheckout } from '@lib/hooks/useCheckout'
import { useDelayedLoading } from '@lib/hooks/useDelayedLoading'
import { CheckinCard, CheckinCardContainer } from '@ui/blocks/CheckinCard'
import { LastCheckin } from '@ui/blocks/LastCheckin'
import { PastCheckin } from '@ui/blocks/PastCheckin'
import { Loading } from '@ui/blocks/Loading'
import { FixedBottomBar } from '@ui/blocks/BottomBar'
import { MobileApp } from '@ui/layouts/MobileApp'

export default function MyCheckinsPage() {
  const checkinsInfo = useCheckins()
  const areaInfo = useArea(checkinsInfo.data?.[0]?.areaId)
  const [isLoading, setIsLoading] = useDelayedLoading(false)
  const checkout = useCheckout()

  const handleCheckout = React.useCallback(
    async (checkin) => {
      setIsLoading(true)
      await checkout({ id: checkin.id })
      setIsLoading(false)
    },
    [setIsLoading, checkout]
  )

  return (
    <MobileApp logoVariant="sticky">
      <Head>
        <title key="title">Meine Checkins | recover</title>
      </Head>
      {checkinsInfo.status === 'success' && checkinsInfo.data.length === 0 && (
        <div>Du hast noch keine Checkins.</div>
      )}
      <CheckinCardContainer>
        {(checkinsInfo.data || []).map((checkin, i) => (
          <motion.div
            key={checkin.id}
            initial={{
              // only animate the first 25 checkins. The other's will be outside the viewport anyways.
              y: i < 25 ? window.innerHeight + i * -50 : 0,
              opacity: i !== 0 && i < 25 ? 0 : 1,
            }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              mass: 3,
              damping: i > 0 ? 30 : 25,
              delay: i > 0 && 0.75,
            }}
          >
            <CheckinCard key={checkin.id} css={{ flexGrow: i > 0 ? 0 : 1 }}>
              {i === 0 ? (
                <>
                  <Loading show={isLoading} />
                  <LastCheckin
                    checkin={checkin}
                    area={areaInfo.data}
                    onCheckout={handleCheckout}
                  />
                </>
              ) : (
                <PastCheckin checkin={checkin} />
              )}
            </CheckinCard>
          </motion.div>
        ))}
      </CheckinCardContainer>
      <FixedBottomBar />
    </MobileApp>
  )
}
