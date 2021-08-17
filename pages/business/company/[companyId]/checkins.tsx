import * as React from 'react'
import { useRouter } from 'next/router'

import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { useCompany } from '~lib/hooks'
import { Text, Box } from '~ui/core'
import { OwnerApp, BackLink } from '~ui/layouts/OwnerApp'
import { ActionList } from '~ui/blocks/ActionList'
import {
  CheckinsActionCard,
  CheckinsActionCardProps,
} from '~ui/blocks/CheckinsActionCard'
import { sortAreas } from '~lib/interactors'
import useLocale from '~locales/useLocale'

const CheckinsPage: React.FC<WithOwnerProps> = () => {
  const { t } = useLocale('pages/business/company/[companyId]/checkins')
  const { query } = useRouter()
  const companyId = query.companyId.toString()
  const { data: company } = useCompany(companyId)
  const actionCardTexts: CheckinsActionCardProps['texts'] = {
    checkedIn: t('checkedIn'),
    checkedOut: t('checkedOut'),
    checkoutAll: t('checkoutAll'),
  }

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
              texts={actionCardTexts}
              companyId={companyId}
            />
          )
        })}
      </ActionList>
    </OwnerApp>
  )
}

export default withOwner()(CheckinsPage)
