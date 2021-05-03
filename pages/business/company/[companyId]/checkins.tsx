import * as React from 'react'
import { useRouter } from 'next/router'

import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { useCompany } from '~lib/hooks'
import { Text, Box } from '~ui/core'
import { OwnerApp, BackLink } from '~ui/layouts/OwnerApp'
import { ActionList } from '~ui/blocks/ActionList'
import { CheckinsActionCard } from '~ui/blocks/CheckinsActionCard'

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
          return (
            <CheckinsActionCard
              key={area.id}
              area={area}
              companyId={companyId}
            />
          )
        })}
      </ActionList>
    </OwnerApp>
  )
}

export default withOwner()(CheckinsPage)
