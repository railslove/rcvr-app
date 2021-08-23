import * as React from 'react'
import { CompanyRes } from '~lib/api'

import { ActionCard } from '~ui/blocks/ActionCard/ActionCard'
import { IconButton } from '~ui/core'
import { Edit, Trash } from '~ui/svg'
import { PDF_TYPE } from '~ui/whitelabels'

export type CompanyCardProps = {
  locales: {
    editButtonText: string
    menuPdfLinkText: string
  }
  company: CompanyRes
  onEdit: () => void
  onDelete: () => void
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  locales,
  company,
  onEdit,
  onDelete,
}) => {
  const menuText = React.useMemo(() => {
    if (company.menuPdfLink) return locales.menuPdfLinkText

    return company.menuLink || '–'
  }, [company, locales])

  return (
    <ActionCard
      href="/business/company/[companyId]"
      as={`/business/company/${company.id}`}
    >
      <ActionCard.Main
        title={company.name}
        subtitle={`${company.menuAlias || PDF_TYPE}: ${menuText}`}
      />
      <ActionCard.Actions>
        <IconButton
          icon={Edit}
          color="yellow.500"
          onClick={onEdit}
          title={locales.editButtonText}
        />
        <IconButton icon={Trash} color="red.500" onClick={onDelete} />
      </ActionCard.Actions>
    </ActionCard>
  )
}
