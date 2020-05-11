import * as React from 'react'
import { Flex, Text } from '@ui/base'
import { Arrows, Slashes } from '@ui/icons'
import formatDate from 'intl-dateformat'
import { addMinutes } from 'date-fns'

type CheckinDatesProps = {
  from: Date
  to?: Date
  autoCheckout?: boolean
}

const AUTOCHECKOUT_AFTER_MINUTES = 240

const CheckinDates: React.FC<CheckinDatesProps> = ({
  from,
  to,
  autoCheckout,
}) => {
  return (
    <Flex align="baseline">
      <Text as="div" fontSize="s">
        {formatDate(from, 'DD.MM.YYYY')}
      </Text>
      <Slashes mx={1} />
      <Text as="div" fontSize="s">
        {formatDate(from, 'HH:mm')}
      </Text>
      {to ? (
        <>
          <Arrows mx={1} />
          <Text as="div" fontSize="s">
            {formatDate(to, 'HH:mm')}
          </Text>
        </>
      ) : autoCheckout ? (
        <>
          <Arrows mx={1} />
          <Text as="div" fontSize="s" opacity="0.5">
            {formatDate(addMinutes(from, AUTOCHECKOUT_AFTER_MINUTES), 'HH:mm')}
            {'  '}
            <Text as="span" fontSize="xxs">
              auto checkout
            </Text>
          </Text>
        </>
      ) : null}
    </Flex>
  )
}

export default CheckinDates
