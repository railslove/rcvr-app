import * as React from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { useMutation } from 'react-query'

import { checkout } from '~lib/actions'
import { useArea, useCheckins, useDelayedLoading } from '~lib/hooks'
import { Box, Text, Callout } from '~ui/core'
import { CheckinCard, CheckinCardContainer } from '~ui/blocks/CheckinCard'
import { LastCheckin } from '~ui/blocks/LastCheckin'
import { PastCheckin } from '~ui/blocks/PastCheckin'
import { Loading } from '~ui/blocks/Loading'
import { FixedBottomBar } from '~ui/blocks/BottomBar'
import { MobileApp } from '~ui/layouts/MobileApp'

export default function MyCheckinsPage() {
  const checkinsInfo = useCheckins()
  const areaInfo = useArea(checkinsInfo.data?.[0]?.areaId)
  const [isLoading, setIsLoading] = useDelayedLoading(false)
  const [checkoutFn, { error }] = useMutation(checkout)

  const handleCheckout = React.useCallback(
    async (checkin) => {
      setIsLoading(true)
      await checkoutFn({ id: checkin.id })
      setIsLoading(false)
    },
    [setIsLoading, checkoutFn]
  )

  return (
    <MobileApp logoVariant="sticky">
      <Head>
        <title key="title">Meine Checkins | recover</title>
      </Head>
      {checkinsInfo.status === 'success' && checkinsInfo.data.length === 0 && (
        <Box my={10}>
          <Text variant="h2" as="h2" color="bluegrey.500" textAlign="center">
            Sie haben noch keine Checkins.
          </Text>
        </Box>
      )}
      <CheckinCardContainer>
        {checkinsInfo.data?.map((checkin, i) => (
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
                  {error && (
                    <Callout variant="danger">
                      <Text>
                        {error instanceof TypeError ? (
                          <p>
                            Wir konnten dich nicht auschecken. Haben Sie
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
