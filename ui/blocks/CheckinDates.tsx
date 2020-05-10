import * as React from 'react'
import { Flex, Text } from '@ui/base'
import { Arrows, Slashes } from '@ui/icons'
import formatDate from 'intl-dateformat'

type CheckinDatesProps = {
  from: Date
  to?: Date
}

const CheckinDates: React.FC<CheckinDatesProps> = ({ from, to }) => {
  return (
    <Flex align="baseline">
      <Text as="div" fontSize="s">
        {formatDate(from, 'MM.DD.YYYY')}
      </Text>
      <Slashes mx={1} />
      <Text as="div" fontSize="s">
        {formatDate(from, 'HH:mm')}
      </Text>
      {to && (
        <>
          <Arrows mx={1} />
          <Text as="div" fontSize="s">
            {formatDate(to, 'HH:mm')}
          </Text>
        </>
      )}
    </Flex>
  )
}

export default CheckinDates
