import * as React from 'react'
import { useRouter } from 'next/router'

import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { useCompany } from '~lib/hooks'
import { Text, Box } from '~ui/core'
import { OwnerApp, BackLink } from '~ui/layouts/OwnerApp'
import { ActionList } from '~ui/blocks/ActionList'
import { CheckinsActionCard } from '~ui/blocks/CheckinsActionCard'
import { sortAreas } from '~lib/interactors'
import useLocale from '~locales/useLocale'

import locales from './checkins.locales'

const CheckinsPage: React.FC<WithOwnerProps> = () => {
  const t = useLocale(locales)
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
      <Text variant="shy">{t('lastCheckinsText')}</Text>
      <Box height={2} />
      <ActionList grid>
        {sortAreas(company?.areas).map((area) => {
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
