import * as React from 'react'
import Link from 'next/link'

import useLocale from '~locales/useLocale'

import { useModals, useCompanies } from '~lib/hooks'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { OwnerApp } from '~ui/layouts/OwnerApp'
import { Box, Text } from '~ui/core'
import { ActionList } from '~ui/blocks/ActionList'
import { AddCard } from '~ui/blocks/AddCard'
import { BusinessDataModal } from '~ui/modals/BusinessDataModal'
import { BusinessDeleteModal } from '~ui/modals/BusinessDeleteModal'
import { PrivateKeyModal } from '~ui/modals/PrivateKeyModal'
import { CompanyCard } from '~ui/blocks/CompanyCard'

const DashboardPage: React.FC<WithOwnerProps> = ({ owner }) => {
  const { t } = useLocale('business/dashboard')

  const { data: companies } = useCompanies()
  const { modals, openModal } = useModals({
    data: BusinessDataModal,
    delete: BusinessDeleteModal,
    privateKey: PrivateKeyModal,
  })

  return (
    <OwnerApp title={t('title')}>
      {modals}
      <ActionList>
        <AddCard
          title={t('actionTitle')}
          onClick={() =>
            owner.privateKey
              ? openModal('data', { type: 'new', owner: owner })
              : openModal('privateKey', { ownerId: owner.id })
          }
        />
        {companies?.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            onEdit={() =>
              owner.privateKey
                ? openModal('data', {
                    type: 'edit',
                    owner: owner,
                    company: company,
                  })
                : openModal('privateKey', { ownerId: owner.id })
            }
            onDelete={() => openModal('delete')}
          />
        ))}
      </ActionList>
      <Box height={10} />
      <Text textAlign={['center', 'center', 'left']}>
        <Link href="/business/logout" passHref>
          <Text variant="h5" as="a" color="bluegrey.400">
            {t('logout')}
          </Text>
        </Link>
      </Text>
    </OwnerApp>
  )
}

export default withOwner()(DashboardPage)
