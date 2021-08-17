import formatDate from 'intl-dateformat'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useArea, useLastAreaTickets } from '~lib/hooks'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import useLocale from '~locales/useLocale'
import { DataList, DataListItem } from '~ui/blocks/DataList'
import { Box, Text } from '~ui/core'
import { BackLink, OwnerApp } from '~ui/layouts/OwnerApp'

const AreasIndexPage: React.FC<WithOwnerProps> = () => {
  const { t } = useLocale('pages/business/company/[companyId]/area/[areaId]')
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
        {t('backLinkText')}
      </BackLink>
      <Text variant="shy">{t('lastCheckins')}</Text>
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
            right={
              <Text>{ticket.leftAt ? t('checkedOut') : t('checkedIn')}</Text>
            }
          />
        ))}
      </DataList>
    </OwnerApp>
  )
}

export default withOwner()(AreasIndexPage)
