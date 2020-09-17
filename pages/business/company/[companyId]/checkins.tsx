import * as React from 'react'
import { useRouter } from 'next/router'
import { queryCache } from 'react-query'

import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { useCompany, useLastTicketsGrouped } from '~lib/hooks'
import { patchTicket } from '~lib/api'
import { Text, Box, Row, Icon } from '~ui/core'
import { TinyCheck } from '~ui/svg'
import { OwnerApp, BackLink } from '~ui/layouts/OwnerApp'
import { ActionList } from '~ui/blocks/ActionList'
import { ActionCard } from '~ui/blocks/ActionCard'
import { Button } from '~ui/core/Button'
import { Loading } from '~ui/blocks/Loading'

const CheckinsPage: React.FC<WithOwnerProps> = () => {
  const { query } = useRouter()
  const companyId = query.companyId.toString()
  const { data: company } = useCompany(companyId)

  return (
    <OwnerApp title={`${company?.name ?? ''} – Checkins`}>
      <BackLink
        href="/business/company/[companyId]"
        as={`/business/company/${companyId}`}
      >
        {company?.name}
      </BackLink>
      <Text variant="shy">
        Checkins der letzten 24 Stunden. Aktualisiert sich automatisch.
      </Text>
      <Box height={2} />
      <ActionList grid>
        {company?.areas.map((area) => {
          return <CheckinsActionCard area={area} companyId={companyId} />
        })}
      </ActionList>
    </OwnerApp>
  )
}

const CheckinsActionCard: React.FC<{
  area: AreaRes
  companyId: number
}> = ({ area, companyId }) => {
  const { data: ticketsByArea } = useLastTicketsGrouped(companyId)

  const tickets = ticketsByArea?.[area.id]
  const openCount = tickets?.open.length ?? 0
  const closedCount = tickets?.closed.length ?? 0
  const [isLoading, setLoading] = React.useState(false)

  const checkoutAll = async () => {
    setLoading(true)

    const leftAt = new Date()

    await tickets?.open.map(({ id }) => patchTicket({ id, leftAt }))

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

export default withOwner()(CheckinsPage)
