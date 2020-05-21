import * as React from 'react'
import { Checkin } from '@lib/db'
import { Text, Box } from '@ui/core'
import { CheckinDates } from './CheckinDates'

interface Props {
  checkin: Checkin
}

export const PastCheckin: React.FC<Props> = ({ checkin }) => {
  return (
    <div>
      <Text variant="h5">{checkin.business}</Text>
      <Box height={1} />
      <CheckinDates from={checkin.enteredAt} to={checkin.leftAt} isPast />
    </div>
  )
}
