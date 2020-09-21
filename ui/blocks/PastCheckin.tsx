import * as React from 'react'

import { Checkin } from '~lib/db'
import { Text, Box } from '~ui/core'
import { CheckinDates } from '~ui/blocks/CheckinDates'

interface Props {
  checkins: Checkin[]
}

export const PastCheckin: React.FC<Props> = ({ checkins }) => {
  const checkin = checkins[0]

  return (
    <div>
      <Text variant="h5">{checkin.business}</Text>
      <Box height={1} />
      <CheckinDates from={checkin.enteredAt} to={checkin.leftAt} isPast />
      {checkins.length > 1 && (
        <>
          <Box height={1} />
          <Text variant="h4">{checkins.length}</Text>
        </>
      )}
    </div>
  )
}
