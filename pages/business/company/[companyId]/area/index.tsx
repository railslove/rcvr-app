import * as React from 'react'
import { useRouter } from 'next/router'
import { toDataURL } from 'qrcode'
import { saveAs } from 'file-saver'

import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { CurrentOwner, useCompany, useModals } from '~lib/hooks'
import { IconButton } from '~ui/core'
import { Edit, Trash, Download } from '~ui/svg'
import { OwnerApp, BackLink } from '~ui/layouts/OwnerApp'
import { ActionList } from '~ui/blocks/ActionList'
import { ActionCard } from '~ui/blocks/ActionCard'
import { AddCard } from '~ui/blocks/AddCard'
import { AreaDeleteModal } from '~ui/modals/AreaDeleteModal'
import { AreaDataModal } from '~ui/modals/AreaDataModal'
import { PrivateKeyModal } from '~ui/modals/PrivateKeyModal'
import { QrInfoModal } from '~ui/modals/QrInfoModal'
import { AreaRes, CompanyRes } from '~lib/api'
import { decrypt } from '~lib/crypto'

const AreasIndexPage: React.FC<WithOwnerProps> = ({ owner }) => {
  const { query } = useRouter()
  const companyId = query.companyId.toString()
  const { data: company } = useCompany(companyId)
  const { modals, openModal } = useModals({
    delete: AreaDeleteModal,
    data: AreaDataModal,
    qrCode: QrInfoModal,
    privateKey: PrivateKeyModal,
  })

  const decryptCwaSeed = (company: CompanyRes, owner: CurrentOwner) => {
    if (owner.privateKey) {
      try {
        return decrypt(company.cwaCryptoSeed, owner.publicKey, owner.privateKey)
      } catch (error) {
        console.error(error)
      }
    }
    return undefined
  }

  const generateQrCode = (area: AreaRes, url: string) => {
    const element = document.createElement('canvas')
    toDataURL(element, url, (_error, url) => {
      saveAs(
        url,
        `qrcode-${area.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.png`
      )
    })
  }

  const handleDownload = (area: AreaRes) => async () => {
    if (!area.companyCwaLinkEnabled) {
      openModal('qrCode')
      generateQrCode(area, `${area.checkinLink}`)
    } else {
      const decrypted = decryptCwaSeed(company, owner)
      if (decrypted == undefined || decrypted == null) {
        openModal('privateKey', { ownerId: owner.id })
      } else {
        openModal('qrCode')
        generateQrCode(
          area,
          `${area.checkinLink}&cwa=${encodeURIComponent(decrypted)}`
        )
      }
    }
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
                onClick={handleDownload(area)}
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
