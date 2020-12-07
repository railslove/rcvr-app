import * as React from 'react'
import { useRouter } from 'next/router'
import formatDate from 'intl-dateformat'

import { isFormal } from '~lib/config'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { useCompany, useDataRequests, useModals } from '~lib/hooks'
import { Text, Box, Divider, Callout, Button } from '~ui/core'
import { Lock, Unlock, Right } from '~ui/svg'
import { OwnerApp, BackLink } from '~ui/layouts/OwnerApp'
import { ActionList } from '~ui/blocks/ActionList'
import { ActionCard } from '~ui/blocks/ActionCard'
import { AutoDataRequestModal } from '~ui/modals/AutoDataRequestModal'

const CompanyPage: React.FC<WithOwnerProps> = () => {
  const { query } = useRouter()
  const companyId = query.companyId.toString()
  const { data: company } = useCompany(companyId)
  const { data: dataRequests } = useDataRequests(companyId)
  const { modals, openModal } = useModals({
    autoDataRequest: AutoDataRequestModal,
  })

  return (
    <OwnerApp title={company?.name}>
      <BackLink href="/business/dashboard">Meine Betriebe</BackLink>
      {modals}
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
          <ActionCard.Main title="Aktuelle Checkins" icon={Right} />
        </ActionCard>
      </ActionList>
      <Divider />

      <Text variant="h3">Kundenkontaktdaten</Text>
      <Box height={4} />
      <Callout>
        <Text>
          <p>
            Anfragen zu Kundenkontaktdaten{' '}
            {isFormal ? 'können Sie' : 'kannst Du'} per Email an{' '}
            <a href="mailto:team@recoverapp.de">team@recoverapp.de</a> stellen.
            Wir melden uns dann schnellstmöglich bei{' '}
            {isFormal ? 'Ihnen' : 'Dir'}.
          </p>
        </Text>
      </Callout>
      <Box height={2} />
      <Callout>
        <Text>
          <p>
            Anfragen zu Kundenkontaktdaten für anwesende{' '}
            {isFormal ? 'Besucher können Sie' : 'Gäste kannst Du'} hier
            automatisch stellen.
          </p>
        </Text>
        <Box height={2} />
        <Button onClick={() => openModal('autoDataRequest', { companyId })}>
          Abfragen
        </Button>
      </Callout>
      <Box height={4} />
      {dataRequests?.length === 0 && (
        <Text variant="shy">
          {isFormal ? 'Sie haben' : 'Du hast'} noch keine freigegebenen
          Kundenkontaktdaten.
        </Text>
      )}
      <ActionList grid>
        {dataRequests?.map((dataRequest) => (
          <ActionCard
            key={dataRequest.id}
            href="/business/company/[companyId]/data-request/[dataRequestId]"
            as={`/business/company/${companyId}/data-request/${dataRequest.id}`}
          >
            <ActionCard.Main
              title={
                formatDate(dataRequest.from, 'DD.MM.YYYY HH:mm') +
                ' – ' +
                formatDate(dataRequest.to, 'DD.MM.YYYY HH:mm')
              }
              subtitle={
                dataRequest.acceptedAt
                  ? 'Freigegeben am: ' +
                    formatDate(dataRequest.acceptedAt, 'DD.MM.YYYY HH:mm')
                  : 'Noch nicht freigegeben'
              }
              icon={dataRequest.acceptedAt ? Unlock : Lock}
            />
          </ActionCard>
        ))}
        <div />
      </ActionList>
    </OwnerApp>
  )
}

export default withOwner()(CompanyPage)
