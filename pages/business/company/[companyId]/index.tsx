import * as React from 'react'
import { useRouter } from 'next/router'
import formatDate from 'intl-dateformat'
import { orderBy } from 'lodash'

import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { useCompany, useDataRequests, useModals } from '~lib/hooks'
import { Text, Box, Divider, Callout, Button } from '~ui/core'
import { Lock, Unlock, Right } from '~ui/svg'
import { OwnerApp, BackLink } from '~ui/layouts/OwnerApp/OwnerApp'
import { ActionList } from '~ui/blocks/ActionList'
import { ActionCard } from '~ui/blocks/ActionCard/ActionCard'
import { AutoDataRequestModal } from '~ui/modals/AutoDataRequestModal'
import { DataRequestRes } from '~lib/api'
import usePageLocale from '~locales/usePageLocale'

import RecoverTeamEmailLink from '~ui/core/Link/RecoverTeamEmailLink'

const CompanyPage: React.FC<WithOwnerProps> = () => {
  const { t } = usePageLocale<'business/company/[companyId]/index'>()
  const { query } = useRouter()
  const companyId = query.companyId.toString()
  const { data: company } = useCompany(companyId)
  const { data: dataRequests } = useDataRequests(companyId)
  const { modals, openModal } = useModals({
    autoDataRequest: AutoDataRequestModal,
  })

  let splitRequest = { currentDataRequest: [], pastDataRequest: [] }

  if (dataRequests?.length) {
    const twoHoursBefore = new Date()
    twoHoursBefore.setHours(new Date().getHours() - 2)
    splitRequest = dataRequests.reduce(
      (result, request) => {
        if (request.to >= twoHoursBefore) {
          result.currentDataRequest.push(request)
        } else {
          result.pastDataRequest.push(request)
        }
        return result
      },
      { currentDataRequest: [], pastDataRequest: [] }
    )
  }

  const sortRequests = (dataRequests: DataRequestRes[]) =>
    orderBy(
      dataRequests,
      [(dataRequest: DataRequestRes) => dataRequest.acceptedAt != null, 'to'],
      ['asc', 'desc']
    )

  const RequestList = ({
    dataRequests,
  }: {
    dataRequests: DataRequestRes[]
  }) => (
    <>
      <Box height={6} />
      <ActionList grid>
        {sortRequests(dataRequests)?.map((dataRequest) => (
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
                  ? `${t('releasedOn')}: ` +
                    formatDate(dataRequest.acceptedAt, 'DD.MM.YYYY HH:mm')
                  : t('notYetReleased')
              }
              icon={dataRequest.acceptedAt ? Unlock : Lock}
            />
          </ActionCard>
        ))}
        <div />
      </ActionList>
    </>
  )

  return (
    <OwnerApp title={company?.name}>
      <BackLink href="/business/dashboard">{t('backLink')}</BackLink>
      {modals}
      <Text variant="h3">{t('pageHeadline')}</Text>
      <Box height={4} />
      <ActionList grid>
        <ActionCard
          href="/business/company/[companyId]/area"
          as={`/business/company/${companyId}/area`}
        >
          <ActionCard.Main title={t('manageArea')} icon={Right} />
        </ActionCard>
        <ActionCard
          href="/business/company/[companyId]/checkins"
          as={`/business/company/${companyId}/checkins`}
        >
          <ActionCard.Main title={t('manageCheckins')} icon={Right} />
        </ActionCard>
      </ActionList>
      <Divider />

      <Callout variant="cyan">
        <Text variant="h3">{t('plausabilityCheckHeadline')}</Text>
        <Box height={2} />
        <Text>
          <p>
            {t('plausabilityCheckText1')} {t('plausabilityCheckText2')}
          </p>
        </Text>
        <Box height={4} />
        <Button onClick={() => openModal('autoDataRequest', { companyId })}>
          {t('dataRequestButtonText')}
        </Button>

        {splitRequest?.currentDataRequest?.length > 0 && (
          <RequestList dataRequests={splitRequest.currentDataRequest} />
        )}
      </Callout>

      <Box height={4} />

      <Callout variant="lilac">
        <Text variant="h3">{t('askHealthOfficeHeadline')}</Text>
        <Box height={2} />
        <Text>
          <p>
            {t('askHealthOfficeText1')} <RecoverTeamEmailLink />{' '}
            {t('askHealthOfficeText2')}{' '}
          </p>
        </Text>

        <Box height={4} />

        {splitRequest?.pastDataRequest?.length > 0 && (
          <RequestList dataRequests={splitRequest.pastDataRequest} />
        )}
      </Callout>
    </OwnerApp>
  )
}

export default withOwner()(CompanyPage)
