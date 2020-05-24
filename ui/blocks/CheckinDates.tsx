import * as React from 'react'
import styled from '@emotion/styled'
import formatDate from 'intl-dateformat'
import { addMinutes } from 'date-fns'

import { Text, Box } from '~ui/core'
import { Slashes, Arrows } from '~ui/svg'

interface Props {
  from: Date
  to?: Date
  isPast?: boolean
}

const AUTOCHECKOUT_AFTER_MINUTES = 240

export const CheckinDates: React.FC<Props> = ({ from, to, isPast }) => {
  return (
    <Row>
      <Text>{formatDate(from, 'DD.MM.YYYY')}</Text>
      <Box width={1} />
      <Slashes />
      <Box width={1} />
      <Text>{formatDate(from, 'HH:mm')}</Text>
      {(to || isPast) && (
        <>
          <Box width={1} />
          <Arrows />
          <Box width={1} />
          <Text>
            {formatDate(
              to || addMinutes(from, AUTOCHECKOUT_AFTER_MINUTES),
              'HH:mm'
            )}
          </Text>
        </>
      )}
    </Row>
  )
}

const Row = styled('div')({
  display: 'flex',
  alignItems: 'baseline',
})
