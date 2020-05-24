import * as React from 'react'
import { useRouter } from 'next/router'

import { withOwner, WithOwnerProps } from '@lib/pageWrappers/withOwner'
import { useCompany } from '@lib/hooks/useCompany'
import { OwnerApp, BackLink } from '@ui/layouts/OwnerApp'
import { Text, Box, Divider } from '@ui/core'
import { ActionList } from '@ui/blocks/ActionList'
import { ActionCard } from '@ui/blocks/ActionCard'
import Right from '@ui/svg/right.svg'

const CompanyPage: React.FC<WithOwnerProps> = () => {
  const { query } = useRouter()
  const companyId = query.companyId.toString()
  const { data: company } = useCompany(companyId)

  return (
    <OwnerApp title={company?.name}>
      <BackLink href="/business/dashboard">Meine Betriebe</BackLink>

      <Text variant="h3">Bereiche</Text>
      <Box height={4} />
      <ActionList grid>
        <ActionCard
          href="/business/company/[companyId]/area"
          as={`/business/company/${companyId}/area`}
        >
          <ActionCard.Main title="Bereiche verwalten" icon={Right} />
        </ActionCard>
        <ActionCard
          href="/business/company/[companyId]/checkins"
          as={`/business/company/${companyId}/checkins`}
        >
          <ActionCard.Main title="Alle Checkins" icon={Right} />
        </ActionCard>
      </ActionList>
      <Divider />

      <Text variant="h3">Daten entschlüsseln</Text>
      <Box height={4} />
      <ActionList grid>
        <ActionCard href="/business/decrypt">
          <ActionCard.Main title="Datenpaket hochladen" icon={Right} />
        </ActionCard>
        <div />
      </ActionList>
    </OwnerApp>
  )
}

export default withOwner()(CompanyPage)
