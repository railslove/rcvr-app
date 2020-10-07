import * as React from 'react'
import styled from '@emotion/styled'
import { useMutation, queryCache } from 'react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'

import { Guest } from '~lib/db/guest'
import { Onboarding } from '~ui/blocks/Onboarding'
import { AreaRes } from '~lib/api'
import { checkin as checkinAction } from '~lib/actions'
import { Checkin } from '~lib/db'
import { Box, Text, Button } from '~ui/core'
import { ArrowsRight, ArrowsLeft, Thumb, Check, Circle } from '~ui/anicons'
import { CheckinDates } from '~ui/blocks/CheckinDates'
import { Loading } from '~ui/blocks/Loading'

interface Props {
  checkins: Checkin[]
  area: AreaRes
  onCheckout: (checkins: Checkin[]) => void
}

export const LastCheckins: React.FC<Props> = ({
  checkins,
  area,
  onCheckout,
}) => {
  const checkin = checkins[0]
  const checkedOut = !!checkin.leftAt
  const idRef = React.useRef<string>(uuidv4())
  const [showProxyCheckin, setShowProxyCheckin] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)

  const [checkinFn] = useMutation(checkinAction, {
    throwOnError: true,
  })

  const proxyCheckin = React.useCallback(
    async (guest: Guest) => {
      const id = idRef.current

      try {
        setLoading(true)

        const ticket = {
          ...checkin,
          id,
          publicKey: area.publicKey,
          encryptedData: null,
          proxyCheckin: true,
          enteredAt: new Date(),
        }

        await checkinFn({ ticket, guest })

        idRef.current = uuidv4() // add a new one for the next
        await queryCache.refetchQueries('checkins')
        setShowProxyCheckin(false)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    },
    [checkin, checkinFn, setShowProxyCheckin, area]
  )

  return (
    <Container>
      <Box height={16} />
      <Circle animated delay={0.5} color={checkedOut ? 'pink' : 'green'}>
        {checkedOut ? (
          <Thumb delay={0.8} />
        ) : (
          <Check delay={0.8} css={{ position: 'relative', top: 2 }} />
        )}
      </Circle>
      <Box height={4} />
      <Text variant="h2">{checkedOut ? 'Checked out' : 'Welcome'}</Text>
      <Box height={1} />
      <Text variant="h4">{checkin.business}</Text>
      {checkins.length > 1 && (
        <>
          <Box height={1} />
          <Text variant="h4">{checkins.length} Personen</Text>
        </>
      )}
      <Box height={4} />
      <CheckinDates from={checkin.enteredAt} to={checkin.leftAt} />
      <Box height={1} />
      {checkin.guest && (
        <>
          <Text variant="label" as="label">
            Name:&nbsp;
            <Text variant="regular" as="span">
              {checkin.guest?.name}
            </Text>
          </Text>
          <Box height={1} />
          <Text variant="label" as="label">
            Anschrift:&nbsp;
            <Text variant="regular" as="span">
              {checkin.guest?.address}
            </Text>
          </Text>
          <Box height={1} />
          <Text variant="label" as="label">
            Telefon:&nbsp;
            <Text variant="regular" as="span">
              {checkin.guest?.phone}
            </Text>
          </Text>
          <Box height={1} />
        </>
      )}
      <AnimatePresence>
        {!checkin.leftAt && (
          <motion.div
            css={{ width: '100%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Box height={8} />
            <Button
              css={{ width: '100%' }}
              left={<ArrowsRight color="pink" />}
              right={<ArrowsLeft color="pink" />}
              onClick={() => onCheckout(checkins)}
            >
              Check out
            </Button>
            {isLoading && <Loading />}
            {showProxyCheckin ? (
              <>
                <Box height={4} />
                <Text variant="h3">Wen willst du mit dir einchecken?</Text>
                <Box height={2} />
                <Onboarding
                  hideRememberMe={true}
                  onSubmit={proxyCheckin}
                  onAbort={() => setShowProxyCheckin(false)}
                />
              </>
            ) : (
              <Button
                css={{ width: '100%', marginTop: '10px' }}
                onClick={() => setShowProxyCheckin(true)}
              >
                Person hinzufügen
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!checkin.leftAt && area?.menuLink && (
          <motion.div
            css={{ width: '100%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Box height={4} />
            <a href={area.menuLink} target="_blank" rel="noopener noreferrer">
              <Button as="div" css={{ width: '100%' }}>
                {area.menuAlias || 'Speisekarte'}
              </Button>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  )
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})
