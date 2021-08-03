import { motion } from 'framer-motion'
import Head from 'next/head'
import * as React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { checkout } from '~lib/actions'
import { Checkin } from '~lib/db'
import { useArea, useCheckins, useDelayedLoading } from '~lib/hooks'
import { FixedBottomBar } from '~ui/blocks/BottomBar'
import { CheckinCard, CheckinCardContainer } from '~ui/blocks/CheckinCard'
import { LastCheckins } from '~ui/blocks/LastCheckins'
import { Loading } from '~ui/blocks/Loading'
import { PastCheckin } from '~ui/blocks/PastCheckin'
import { Box, Callout, Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'

import locales from './my-checkins.locales'
import useLocale from '~locales/useLocale'

export default function MyCheckinsPage() {
  const t = useLocale(locales)
  const checkinsInfo = useCheckins()

  const [isLoading, setIsLoading] = useDelayedLoading(false)
  const mutation = useMutation(checkout)
  const queryClient = useQueryClient()

  const handleCheckout = React.useCallback(
    async (checkins: Checkin[]) => {
      setIsLoading(true)
      await Promise.all(
        checkins.map((checkin) =>
          mutation.mutate({ queryClient, checkin: { id: checkin.id } })
        )
      )
      setIsLoading(false)
    },
    [setIsLoading, mutation, queryClient]
  )

  const sortedCheckins = React.useMemo(() => {
    // Sort from old to new
    return checkinsInfo.data?.sort(
      (c1, c2) => c1.enteredAt.getTime() - c2.enteredAt.getTime()
    )
  }, [checkinsInfo.data])

  // Sorts checkins by time and groups proxy checkins together with their "main" checkins
  //
  // We do this by first sorting the checkins by checkin time, thus we always have a main checkin
  // and followed by the associated proxy checkins. We take each of these consecutive checkins
  // and put them in an array so we can render them as a group.
  const groupedCheckins = React.useMemo(() => {
    return sortedCheckins?.reduce((result: Checkin[][], checkin: Checkin) => {
      if (!checkin.proxyCheckin) {
        result.unshift([checkin]) // main checkins are added in a new array
      } else {
        result[0].push(checkin) // proxy checkins are added to the last main checkin
      }

      return result
    }, [])
  }, [sortedCheckins])

  const lastCheckin = React.useMemo(() => {
    if (!sortedCheckins) {
      return
    }
    if (sortedCheckins.length < 1) {
      return
    }
    return sortedCheckins[sortedCheckins.length - 1]
  }, [sortedCheckins])

  const area = useArea(lastCheckin?.areaId)

  return (
    <MobileApp logoVariant="sticky" secondaryLogo={area?.data?.affiliateLogo}>
      <Head>
        <title key="title">Meine Checkins | recover</title>
      </Head>
      {checkinsInfo.status === 'success' && checkinsInfo.data.length === 0 && (
        <Box my={10}>
          <Text variant="h2" as="h2" color="bluegrey.500" textAlign="center">
            {t('noCheckinsYet')}
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
                  {mutation.error && (
                    <Callout variant="danger">
                      <Text>
                        {mutation.error instanceof TypeError ? (
                          <p>{t('couldNotCheckinNoInternet')}</p>
                        ) : (
                          <p>{t('couldNotCheckin')}</p>
                        )}
                        <p>{t('couldNotCheckinWellCheckYouOut')}</p>
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
