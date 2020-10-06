import * as React from 'react'
import styled from '@emotion/styled'
import { motion, AnimatePresence } from 'framer-motion'

import { AreaRes } from '~lib/api'
import { Checkin } from '~lib/db'
import { Box, Text, Button } from '~ui/core'
import { ArrowsRight, ArrowsLeft, Thumb, Check, Circle } from '~ui/anicons'
import { CheckinDates } from '~ui/blocks/CheckinDates'
import { useCurrentGuest } from '~lib/hooks'

interface Props {
  checkin: Checkin
  area: AreaRes
  onCheckout?: (checkin: Checkin) => void
}

export const LastCheckin: React.FC<Props> = ({ checkin, area, onCheckout }) => {
  const checkedOut = !!checkin.leftAt

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
      <Box height={2} />
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
              onClick={() => onCheckout(checkin)}
            >
              Check out
            </Button>
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
  height: 400,
})
