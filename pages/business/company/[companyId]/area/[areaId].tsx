import * as React from 'react'
import { useRouter } from 'next/router'
import formatDate from 'intl-dateformat'

import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { useArea, useLastAreaTickets } from '~lib/hooks'
import { Text, Box } from '~ui/core'
import { OwnerApp, BackLink } from '~ui/layouts/OwnerApp'
import { DataList, DataListItem } from '~ui/blocks/DataList'

const AreasIndexPage: React.FC<WithOwnerProps> = () => {
  const { query } = useRouter()
  const companyId = query.companyId.toString()
  const areaId = query.areaId.toString()
  const { data: area } = useArea(areaId)
  const { data: tickets } = useLastAreaTickets(companyId, areaId)

  return (
    <OwnerApp title={area?.name}>
      <BackLink
        href="/business/company/[companyId]/checkins"
        as={`/business/company/${companyId}/checkins`}
      >
        Checkins
      </BackLink>
      <Text variant="shy">
        Checkins der letzten 6 Stunden. Aktualisiert sich automatisch.
      </Text>
      <Box height={2} />
      <DataList>
        {tickets?.map((ticket) => (
          <DataListItem
            key={ticket.id}
            color={ticket.leftAt ? 'pink' : 'green'}
            left={
              <Text variant="h5">
                {formatDate(ticket.enteredAt, 'DD.MM.YYYY HH:mm')}
                {ticket.leftAt && ' – ' + formatDate(ticket.leftAt, 'HH:mm')}
              </Text>
            }
            right={<Text>{ticket.leftAt ? 'ausgecheckt' : 'offen'}</Text>}
          />
        ))}
      </DataList>
    </OwnerApp>
  )
}

export default withOwner()(AreasIndexPage)
