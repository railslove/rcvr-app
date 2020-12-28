import * as React from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { useMutation } from 'react-query'

import { Checkin } from '~lib/db'
import { checkout } from '~lib/actions'
import { isCareEnv } from '~lib/config'
import { useCheckins, useDelayedLoading } from '~lib/hooks'
import { Box, Text, Callout } from '~ui/core'
import { CheckinCard, CheckinCardContainer } from '~ui/blocks/CheckinCard'
import { LastCheckins } from '~ui/blocks/LastCheckins'
import { PastCheckin } from '~ui/blocks/PastCheckin'
import { Loading } from '~ui/blocks/Loading'
import { FixedBottomBar } from '~ui/blocks/BottomBar'
import { MobileApp } from '~ui/layouts/MobileApp'
import { Guest } from '../lib/db/guest';

export default function MyCheckinsPage() {
  const checkinsInfo = useCheckins()
  const [isLoading, setIsLoading] = useDelayedLoading(false)
  const [checkoutFn, { error }] = useMutation(checkout)

  const handleCheckout = React.useCallback(
    async (checkins: Checkin[]) => {
      setIsLoading(true)
      await Promise.all(
        checkins.map((checkin) => checkoutFn({ id: checkin.id }))
      )
      setIsLoading(false)
    },
    [setIsLoading, checkoutFn]
  )

  // Sorts checkins by time and groups proxy checkins together with their "main" checkins
  //
  // We do this by first sorting the checkins by checkin time, thus we always have a main checkin
  // and followed by the associated proxy checkins. We take each of these consecutive checkins
  // and put them in an array so we can render them as a group.
  const groupedCheckins = React.useMemo(() => {
    // Sort from old to new
    const sortedCheckins = checkinsInfo.data?.sort(
      (c1, c2) => c1.enteredAt.getTime() - c2.enteredAt.getTime()
    )

    return sortedCheckins?.reduce((result: Checkin[][], checkin: Checkin) => {
      if (!checkin.proxyCheckin) {
        result.unshift([checkin]) // main checkins are added in a new array
      } else {
        result[0].push(checkin) // proxy checkins are added to the last main checkin
      }

      return result
    }, [])
  }, [checkinsInfo.data])

  return (
    <MobileApp logoVariant="sticky">
      <Head>
        <title key="title">Meine Checkins | recover</title>
      </Head>
      {checkinsInfo.status === 'success' && checkinsInfo.data.length === 0 && (
        <Box my={10}>
          <Text variant="h2" as="h2" color="bluegrey.500" textAlign="center">
            {isCareEnv
              ? 'Sie haben noch keine Checkins'
              : 'Du hast noch keine Checkins.'}
          </Text>
        </Box>
      )}
      <CheckinCardContainer>
        {groupedCheckins?.map((checkins: Checkin[], i) => (
          <motion.div
            key={checkins[0].id}
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
            <CheckinCard css={{ flexGrow: i > 0 ? 0 : 1 }}>
              {i === 0 ? (
                <>
                  <Loading show={isLoading} />
                  <LastCheckins
                    checkins={checkins}
                    onCheckout={handleCheckout}
                  />
                  {error && (
                    <Callout variant="danger">
                      <Text>
                        {error instanceof TypeError ? (
                          <p>
                            Wir konnten dich nicht auschecken. Hast du
                            vielleicht gerade kein Internet?
                          </p>
                        ) : (
                          <p>Wir konnten dich nicht auschecken.</p>
                        )}
                        <p>
                          Sollte das Problem weiterhin bestehen, keine Sorge:
                          wir checken dich später automatisch aus.
                        </p>
                      </Text>
                    </Callout>
                  )}
                </>
              ) : (
                <PastCheckin checkins={checkins} />
              )}
            </CheckinCard>
          </motion.div>
        ))}
      </CheckinCardContainer>
      <FixedBottomBar />
    </MobileApp>
  )
}
