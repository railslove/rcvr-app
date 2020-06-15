import * as React from 'react'
import Link from 'next/link'

import { useModals, useCompanies } from '~lib/hooks'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { OwnerApp } from '~ui/layouts/OwnerApp'
import { Box, Text } from '~ui/core'
import { ActionList } from '~ui/blocks/ActionList'
import { AddCard } from '~ui/blocks/AddCard'
import { BusinessDataModal } from '~ui/modals/BusinessDataModal'
import { BusinessDeleteModal } from '~ui/modals/BusinessDeleteModal'
import { CompanyCard } from '~ui/blocks/CompanyCard'

const DashboardPage: React.FC<WithOwnerProps> = () => {
  const { data: companies } = useCompanies()
  const { modals, openModal } = useModals({
    data: BusinessDataModal,
    delete: BusinessDeleteModal,
  })

  const menuPdfFileName = (company) => company.menuPdfLink?.split('/')?.pop()

  return (
    <OwnerApp title="Meine Betriebe">
      {modals}
      <ActionList>
        <AddCard
          title="Betrieb anlegen..."
          onClick={() => openModal('data', { type: 'new' })}
        />
        {companies?.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            onEdit={() =>
              openModal('data', {
                type: 'edit',
                name: company.name,
                menuLink: company.menuLink,
                menuPdfLink: menuPdfFileName(company),
                companyId: company.id,
              })
            }
            onDelete={() => openModal('delete')}
          />
        ))}
      </ActionList>
      <Box height={10} />
      <Text textAlign={['center', 'center', 'left']}>
        <Link href="/business/logout" passHref>
          <Text variant="h5" as="a" color="bluegrey.400">
            Logout
          </Text>
        </Link>
      </Text>
    </OwnerApp>
  )
}

export default withOwner()(DashboardPage)
