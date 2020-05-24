import * as React from 'react'
import { useRouter } from 'next/router'

import { withOwner, WithOwnerProps } from '@lib/pageWrappers/withOwner'
import { useCompany } from '@lib/hooks/useCompany'
import { useModals } from '@lib/hooks/useModals'
import { OwnerApp, BackLink } from '@ui/layouts/OwnerApp'
import { IconButton, Box, Icon } from '@ui/core'
import { ActionList } from '@ui/blocks/ActionList'
import { ActionCard } from '@ui/blocks/ActionCard'
import { AddCard } from '@ui/blocks/AddCard'
import { AreaDeleteModal } from '@ui/modals/AreaDeleteModal'
import { AreaDataModal } from '@ui/modals/AreaDataModal'
import Edit from '@ui/svg/edit.svg'
import Right from '@ui/svg/right.svg'
import Trash from '@ui/svg/trash.svg'
import Download from '@ui/svg/download.svg'

const AreasIndexPage: React.FC<WithOwnerProps> = () => {
  const { query } = useRouter()
  const companyId = query.companyId.toString()
  const { data: company } = useCompany(companyId)
  const { modals, openModal } = useModals({
    delete: AreaDeleteModal,
    data: AreaDataModal,
  })

  return (
    <OwnerApp title={`${company?.name ?? ''} – Bereiche`}>
      <BackLink
        href="/business/company/[companyId]"
        as={`/business/company/${companyId}`}
      >
        {company?.name}
      </BackLink>
      {modals}

      <Box display={['block', 'block', 'none']}>
        <Box mb={6}>
          <ActionCard
            href="/business/company/[companyId]/checkins"
            as={`/business/company/${companyId}/checkins`}
          >
            <ActionCard.Main
              title={
                <>
                  Aktuelle Checkins{' '}
                  <Icon
                    icon={Right}
                    size={4}
                    css={{
                      display: 'inline-block',
                      top: 3,
                      position: 'relative',
                    }}
                  />
                </>
              }
            />
          </ActionCard>
        </Box>
        <Box height="px" bg="bluegrey.100" mb={6} />
      </Box>

      <ActionList>
        <AddCard
          title="Bereich hinzufügen..."
          onClick={() => openModal('data', { companyId: companyId })}
        />
        {company?.areas.map((area) => (
          <ActionCard
            key={area.id}
            href="/business/company/[companyId]/area/[areaId]"
            as={`/business/company/${companyId}/area/${area.id}`}
          >
            <ActionCard.Main title={area.name} />
            <ActionCard.Actions>
              <IconButton
                icon={Download}
                color="bluegrey.700"
                onClick={() =>
                  window.open(
                    process.env.apiBase + 'areas/' + area.id + '.pdf',
                    '_blank'
                  )
                }
                title="QR Code"
              />
              <IconButton
                icon={Edit}
                color="yellow.500"
                onClick={() =>
                  openModal('data', {
                    type: 'edit',
                    areaId: area.id,
                    name: area.name,
                  })
                }
                title="Ändern"
              />
              <IconButton
                icon={Trash}
                color="red.500"
                onClick={() => openModal('delete')}
              />
            </ActionCard.Actions>
          </ActionCard>
        ))}
      </ActionList>
    </OwnerApp>
  )
}

export default withOwner()(AreasIndexPage)
