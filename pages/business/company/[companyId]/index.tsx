import * as React from 'react'
import { useRouter } from 'next/router'

import { withOwner, WithOwnerProps } from '@lib/pageWrappers/withOwner'
import { useCompany } from '@lib/hooks/useCompany'
import { OwnerApp, BackLink } from '@ui/layouts/OwnerApp'
import { ActionList } from '@ui/blocks/ActionList'

const CompanyPage: React.FC<WithOwnerProps> = () => {
  const { query } = useRouter()
  const companyId = query.companyId.toString()
  const { data: company } = useCompany(companyId)

  return (
    <OwnerApp title={company?.name ?? ' '}>
      <BackLink href="/business/dashboard">Meine Betriebe</BackLink>

      <ActionList></ActionList>
    </OwnerApp>
  )
}

export default withOwner()(CompanyPage)
