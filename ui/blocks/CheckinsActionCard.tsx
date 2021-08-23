import * as React from 'react'
import { useQueryClient } from 'react-query'
import { AreaRes, patchTicket } from '~lib/api'
import { useLastTicketsGrouped } from '~lib/hooks'
import { ActionCard } from '~ui/blocks/ActionCard/ActionCard'
import { Loading } from '~ui/blocks/Loading'
import { Box, Icon, IconButton, Row } from '~ui/core'
import { Arrows, TinyCheck } from '~ui/svg'

export type CheckinsActionCardProps = {
  area: AreaRes
  companyId: string
  locales: {
    checkedIn: string
    checkedOut: string
    checkoutAll: string
  }
}

export const CheckinsActionCard: React.FC<CheckinsActionCardProps> = ({
  area,
  locales,
  companyId,
}) => {
  const { data: ticketsByArea } = useLastTicketsGrouped(companyId)
  const queryClient = useQueryClient()

  const tickets = ticketsByArea?.[area.id]
  const openCount = tickets?.open.length ?? 0
  const closedCount = tickets?.closed.length ?? 0
  const [isLoading, setLoading] = React.useState(false)

  const checkoutAll = async () => {
    setLoading(true)

    const leftAt = new Date()

    const openTickets = tickets?.open || []
    await Promise.all(openTickets.map(({ id }) => patchTicket({ id, leftAt })))

    await queryClient.invalidateQueries(['tickets', companyId])

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
            <span css={{ whiteSpace: 'nowrap' }}>
              {locales.checkedIn}: {openCount}
            </span>
            {' – '}
            <span css={{ whiteSpace: 'nowrap' }}>
              {locales.checkedOut}: {closedCount}
            </span>
          </>
        }
      />
      {openCount > 0 && (
        <ActionCard.Actions>
          <IconButton
            icon={Arrows}
            onClick={checkoutAll}
            title={locales.checkoutAll}
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
