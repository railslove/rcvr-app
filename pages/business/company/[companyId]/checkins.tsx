import * as React from 'react'
import { useRouter } from 'next/router'

import { withOwner, WithOwnerProps } from '@lib/pageWrappers/withOwner'
import { useCompany } from '@lib/hooks/useCompany'
import { useLastTicketsGrouped } from '@lib/hooks/useLastTickets'
import { OwnerApp, BackLink } from '@ui/layouts/OwnerApp'
import { Text, Box } from '@ui/core'
import { ActionList } from '@ui/blocks/ActionList'
import { ActionCard } from '@ui/blocks/ActionCard'

const CheckinsPage: React.FC<WithOwnerProps> = () => {
  const { query } = useRouter()
  const companyId = query.companyId.toString()
  const { data: company } = useCompany(companyId)
  const { data: ticketsByArea } = useLastTicketsGrouped(companyId)

  return (
    <OwnerApp title={`${company?.name ?? ''} – Checkins`}>
      <BackLink
        href="/business/company/[companyId]"
        as={`/business/company/${companyId}`}
      >
        {company?.name}
      </BackLink>
      <Text variant="shy">
        Checkins der letzten 6 Stunden. Aktualisiert sich automatisch.
      </Text>
      <Box height={2} />
      <ActionList grid>
        {company?.areas.map((area) => {
          const tickets = ticketsByArea?.[area.id]
          const openCount = tickets?.open.length ?? ''
          const closedCount = tickets?.closed.length ?? ''

          return (
            <ActionCard
              key={area.id}
              href="/business/company/[companyId]/area/[areaId]"
              as={`/business/company/${companyId}/area/${area.id}`}
            >
              <ActionCard.Main
                title={area.name}
                subtitle={`Offen: ${openCount} - Fertig: ${closedCount}`}
              />
            </ActionCard>
          )
        })}
      </ActionList>
    </OwnerApp>
  )
}

export default withOwner()(CheckinsPage)
