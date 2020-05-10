import * as React from 'react'
import { useQuery, useMutation } from 'react-query'
import { motion } from 'framer-motion'

import * as api from '@lib/api'
import * as db from '@lib/db'
import { Card, Flex } from '@ui/base'
import AppLayout from '@ui/layouts/App'
import LastCheckin from '@ui/blocks/LastCheckin'
import CheckinHead from '@ui/blocks/CheckinHead'
import Loading from '@ui/blocks/Loading'

const MyCheckinsPage: React.FC<{}> = () => {
  const [isRefetching, setIsRefetching] = React.useState(false)
  const [checkout] = useMutation(api.checkoutTicket)
  const { data: checkins = [], refetch } = useQuery(
    'checkins',
    db.getAllCheckins
  )

  const handleCheckout = React.useCallback(
    async (checkin) => {
      const timeoutId = setTimeout(() => setIsRefetching(true), 800)
      await checkout({ id: checkin.id, leftAt: new Date() })
      await refetch()
      clearTimeout(timeoutId)
      setIsRefetching(false)
    },
    [refetch, checkout]
  )

  return (
    <AppLayout>
      <Flex
        as="ul"
        flexDir="column"
        flex="1"
        position="relative"
        overflow="hidden"
        pt={5}
        mt={-5}
      >
        {checkins.map((checkin, i) => (
          <motion.li
            key={checkin.id}
            initial={{
              y: window.innerHeight + i * -50,
              opacity: i === 0 ? 1 : 0,
            }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              mass: 3,
              damping: i > 0 ? 30 : 25,
              delay: i > 0 && 0.75,
            }}
          >
            <Card
              exit={{ opacity: 0 }}
              flexGrow={i === 0 ? 1 : 0}
              flexShrink={0}
              variant={i < checkins.length - 1 && 'overlap'}
              height={i === 0 && 470} // needs fixed height for nice layout
            >
              {isRefetching && i === 0 ? (
                <Flex align="center" justify="center" height="100%">
                  <Loading />
                </Flex>
              ) : i === 0 ? (
                <LastCheckin checkin={checkin} onCheckout={handleCheckout} />
              ) : (
                <CheckinHead checkin={checkin} />
              )}
            </Card>
          </motion.li>
        ))}
      </Flex>
    </AppLayout>
  )
}

export default MyCheckinsPage
