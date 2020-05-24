import * as React from 'react'
import { useRouter } from 'next/router'

import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { useCompany } from '~lib/hooks'
import { Text, Box, Divider, Callout } from '~ui/core'
import { Right } from '~ui/svg'
import { OwnerApp, BackLink } from '~ui/layouts/OwnerApp'
import { ActionList } from '~ui/blocks/ActionList'
import { ActionCard } from '~ui/blocks/ActionCard'

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
      <Callout>
        <Text>
          <p>
            Anfragen zu Kundenkontaktdaten kannst Du per Email an{' '}
            <a href="mailto:team@recoverapp.de">team@recoverapp.de</a> stellen.
            Wir melden uns dann schnellstmöglich bei Dir. Wir arbeiten an einem
            automatisierten Prozess dafür.
          </p>
        </Text>
      </Callout>
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
