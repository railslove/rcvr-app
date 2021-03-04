import * as React from 'react'
import { queryCache } from 'react-query'
import { AreaRes, patchTicket } from '~lib/api'
import { useLastTicketsGrouped } from '~lib/hooks'
import { ActionCard } from '~ui/blocks/ActionCard'
import { Loading } from '~ui/blocks/Loading'
import { Box, Icon, IconButton, Row } from '~ui/core'
import { Arrows, TinyCheck } from '~ui/svg'

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
            <span css={{ whiteSpace: 'nowrap' }}>eingecheckt: {openCount}</span>
            {' – '}
            <span css={{ whiteSpace: 'nowrap' }}>
              ausgecheckt: {closedCount}
            </span>
          </>
        }
      />
      {openCount > 0 && (
        <ActionCard.Actions>
          <IconButton
            icon={Arrows}
            onClick={checkoutAll}
            title="Alle Auschecken"
          />
        </ActionCard.Actions>
      )}
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
