import * as React from 'react'

import { patchTicket, AreaRes } from '~lib/api'
import { ActionCard } from '~ui/blocks/ActionCard'
import { Loading } from '~ui/blocks/Loading'
import { TinyCheck } from '~ui/svg'
import { Button } from '~ui/core/Button'
import { Box, Row, Icon } from '~ui/core'
import { useLastTicketsGrouped } from '~lib/hooks'
import { queryCache } from 'react-query'

export const CheckinsActionCard: React.FC<{
  area: AreaRes
  companyId: string
}> = ({ area, companyId }) => {
  const { data: ticketsByArea } = useLastTicketsGrouped(companyId)

  const tickets = ticketsByArea?.[area.id]
  const openCount = tickets?.open.length ?? 0
  const closedCount = tickets?.closed.length ?? 0
  const [isLoading, setLoading] = React.useState(false)

  const checkoutAll = async () => {
    setLoading(true)

    const leftAt = new Date()

    const openTickets = tickets?.open || []
    await Promise.all(openTickets.map(({ id }) => patchTicket({ id, leftAt })))

    await queryCache.refetchQueries(['tickets', companyId])

    setLoading(false)
  }

  return (
    <ActionCard
      href="/business/company/[companyId]/area/[areaId]"
      as={`/business/company/${companyId}/area/${area.id}`}
    >
      <Loading show={isLoading} />
      <ActionCard.Main
        title={area.name}
        subtitle={
          <>
            <span css={{ whiteSpace: 'nowrap' }}>am Tisch: {openCount}</span>
            {' – '}
            <span css={{ whiteSpace: 'nowrap' }}>
              ausgecheckt: {closedCount}
            </span>
          </>
        }
      />
      <ActionCard.Actions>
        <Button onClick={checkoutAll}>Alle Auschecken</Button>
      </ActionCard.Actions>
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
}
