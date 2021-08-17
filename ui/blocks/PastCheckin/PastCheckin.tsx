import * as React from 'react'

import { Checkin } from '~lib/db'
import { Text, Box } from '~ui/core'
import { CheckinDates } from '~ui/blocks/CheckinDates'

import useLocaleObject from '~locales/useLocaleObject'
import PastCheckinLocales from '~ui/blocks/PastCheckin/PastCheckin.locales'

interface Props {
  checkins: Checkin[]
}

export const PastCheckin: React.FC<Props> = ({ checkins }) => {
  const [checkin] = checkins
  const { t } = useLocaleObject(PastCheckinLocales)

  return (
    <div>
      <Text variant="h5">{checkin.business}</Text>
      <Box height={1} />
      <CheckinDates from={checkin.enteredAt} to={checkin.leftAt} isPast />
      {checkins.length > 1 && (
        <>
          <Box height={1} />
          <Text variant="h4">
            {checkins.length} {t('people')}
          </Text>
        </>
      )}
    </div>
  )
}
