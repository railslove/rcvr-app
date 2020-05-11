import * as React from 'react'
import * as db from '@lib/db'
import { Circle, Flex, Text, Box, Button } from '@ui/base'
import { Check, Arrows, Thumb } from '@ui/icons'
import CheckinDates from './CheckinDates'

type LastCheckinProps = {
  checkin: db.Checkin
  onCheckout?: (checkin: db.Checkin) => void
}

const LastCheckin: React.FC<LastCheckinProps> = ({ checkin, onCheckout }) => {
  const checkedOut = !!checkin.leftAt
  const StatusIcon = checkedOut ? Thumb : Check

  return (
    <Flex flexDirection="column" align="center" py={6}>
      <Circle color={checkedOut ? 'pink' : 'green'} animated delay={0.8}>
        <StatusIcon animated delay={0.4} />
      </Circle>
      <Text fontSize="l" fontWeight="bold" pt={3}>
        {checkedOut ? 'Checked out' : 'Welcome'}
      </Text>
      <Text fontSize="md" pb={3}>
        {checkin.business}
      </Text>
      <CheckinDates from={checkin.enteredAt} to={checkin.leftAt} />
      <Box my={4} height={5} width="255px">
        {!checkedOut && (
          <Button
            title="Check out"
            animateOut
            left={<Arrows color="pink" left size="16px" />}
            right={<Arrows color="pink" size="16px" />}
            onClick={(): void => onCheckout(checkin)}
          />
        )}
      </Box>
    </Flex>
  )
}

export default LastCheckin
