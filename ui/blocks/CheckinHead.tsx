import * as React from 'react'
import * as db from '@lib/db'
import { Text } from '@ui/base'
import CheckinDates from './CheckinDates'

type CheckinHeadProps = {
  checkin: db.Checkin
}

const CheckinHead: React.FC<CheckinHeadProps> = ({ checkin }) => {
  return (
    <div>
      <Text as="div" fontSize="s" fontWeight="bold" pb={1}>
        {checkin.business}
      </Text>
      <CheckinDates from={checkin.enteredAt} to={checkin.leftAt} autoCheckout />
    </div>
  )
}

export default CheckinHead
