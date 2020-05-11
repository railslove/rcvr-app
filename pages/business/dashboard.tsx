import * as React from 'react'
import { useMutation, useQuery } from 'react-query'
import Link from 'next/link'
import { useOwner } from '@lib/db'
import { postCompany, fetchCompanies } from '@lib/api'
import BusinessLayout from '@ui/layouts/Business'
import AddCard from '@ui/blocks/AddCard'
import CompanyCard from '@ui/blocks/CompanyCard'

type DashboardProps = {}

const Dashboard: React.FC<DashboardProps> = () => {
  useOwner()
  const { data: companies = [], refetch } = useQuery(
    'companies',
    fetchCompanies
  )
  const [addCompany] = useMutation(postCompany)
  const [tmpNewCompany, setTmpNewCompany] = React.useState<string | undefined>()

  const handleAddNewCompany = React.useCallback(
    async (name) => {
      setTmpNewCompany(name)
      await addCompany({ name })
      await refetch()
      setTmpNewCompany(undefined)
    },
    [addCompany, refetch]
  )

  return (
    <BusinessLayout title="Meine Firmen">
      {companies.map((company) => (
        <Link
          key={company.id}
          href="/business/company/[companyId]"
          as={`/business/company/${company.id}`}
        >
          <a>
            <CompanyCard name={company.name} />
          </a>
        </Link>
      ))}
      {tmpNewCompany && <CompanyCard name={tmpNewCompany} loading />}
      <AddCard label="Firmenname" onAdd={handleAddNewCompany} />
    </BusinessLayout>
  )
}

export default Dashboard
