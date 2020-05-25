import * as React from 'react'
import Link from 'next/link'

import { useModals, useCompanies } from '~lib/hooks'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { IconButton, Box, Text } from '~ui/core'
import { Edit, Trash } from '~ui/svg'
import { OwnerApp } from '~ui/layouts/OwnerApp'
import { ActionCard } from '~ui/blocks/ActionCard'
import { ActionList } from '~ui/blocks/ActionList'
import { AddCard } from '~ui/blocks/AddCard'
import { BusinessDataModal } from '~ui/modals/BusinessDataModal'
import { BusinessDeleteModal } from '~ui/modals/BusinessDeleteModal'

const DashboardPage: React.FC<WithOwnerProps> = () => {
  const { data: companies } = useCompanies()
  const { modals, openModal } = useModals({
    data: BusinessDataModal,
    delete: BusinessDeleteModal,
  })

  return (
    <OwnerApp title="Meine Betriebe">
      {modals}
      <ActionList>
        <AddCard
          title="Betrieb anlegen..."
          onClick={() => openModal('data', { type: 'new' })}
        />
        {companies?.map((company) => (
          <ActionCard
            key={company.id}
            href="/business/company/[companyId]"
            as={`/business/company/${company.id}`}
          >
            <ActionCard.Main
              title={company.name}
              subtitle={'Speisekarte: ' + (company.menuLink || '–')}
            />
            <ActionCard.Actions>
              <IconButton
                icon={Edit}
                color="yellow.500"
                onClick={() =>
                  openModal('data', {
                    type: 'edit',
                    name: company.name,
                    menuLink: company.menuLink,
                    companyId: company.id,
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
