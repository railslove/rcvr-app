import * as React from 'react'
import { useRouter } from 'next/router'

import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { useCompany, useModals } from '~lib/hooks'
import { IconButton } from '~ui/core'
import { Edit, Trash, Download } from '~ui/svg'
import { OwnerApp, BackLink } from '~ui/layouts/OwnerApp'
import { ActionList } from '~ui/blocks/ActionList'
import { ActionCard } from '~ui/blocks/ActionCard'
import { AddCard } from '~ui/blocks/AddCard'
import { AreaDeleteModal } from '~ui/modals/AreaDeleteModal'
import { AreaDataModal } from '~ui/modals/AreaDataModal'
import { QrInfoModal } from '~ui/modals/QrInfoModal'

const AreasIndexPage: React.FC<WithOwnerProps> = () => {
  const { query } = useRouter()
  const companyId = query.companyId.toString()
  const { data: company } = useCompany(companyId)
  const { modals, openModal } = useModals({
    delete: AreaDeleteModal,
    data: AreaDataModal,
    qrCode: QrInfoModal,
  })

  const handleDownload = (areaId: string) => () => {
    window.location.href =
      process.env.NEXT_PUBLIC_API_BASE + 'areas/' + areaId + '.png'

    openModal('qrCode')
  }

  return (
    <OwnerApp title={`${company?.name ?? ''} – Bereiche`}>
      <BackLink
        href="/business/company/[companyId]"
        as={`/business/company/${companyId}`}
      >
        {company?.name}
      </BackLink>
      {modals}
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
                onClick={handleDownload(area.id)}
                title="QR-Code"
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
