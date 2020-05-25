import * as React from 'react'
import { useRouter } from 'next/router'

import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { useCompany, useLastTicketsGrouped } from '~lib/hooks'
import { Text, Box, Row, Icon } from '~ui/core'
import { TinyCheck } from '~ui/svg'
import { OwnerApp, BackLink } from '~ui/layouts/OwnerApp'
import { ActionList } from '~ui/blocks/ActionList'
import { ActionCard } from '~ui/blocks/ActionCard'

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
          const openCount = tickets?.open.length ?? 0
          const closedCount = tickets?.closed.length ?? 0

          return (
            <ActionCard
              key={area.id}
              href="/business/company/[companyId]/area/[areaId]"
              as={`/business/company/${companyId}/area/${area.id}`}
            >
              <ActionCard.Main
                title={area.name}
                subtitle={`am Tisch: ${openCount} – ausgecheckt: ${closedCount}`}
              />
              <ActionCard.Below>
                <Row flexWrap="wrap" flex="1 0">
                  {[...Array(openCount)].map((_v, i) => (
                    <Box key={i} mx="2px">
                      <Icon icon={TinyCheck} size={4} />
                    </Box>
                  ))}
                </Row>
              </ActionCard.Below>
            </ActionCard>
          )
        })}
      </ActionList>
    </OwnerApp>
  )
}

export default withOwner()(CheckinsPage)
