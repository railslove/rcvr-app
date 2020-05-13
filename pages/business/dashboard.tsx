import * as React from 'react'
import { useMutation, useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useOwner } from '@lib/db'
import { postCompany, fetchCompanies } from '@lib/api'
import { Box, Text, Button } from '@ui/base'
import BusinessLayout from '@ui/layouts/Business'
import AddCard from '@ui/blocks/AddCard'
import CompanyCard from '@ui/blocks/CompanyCard'

type DashboardProps = {}

const Dashboard: React.FC<DashboardProps> = () => {
  const { owner } = useOwner()
  const router = useRouter()
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

  const handleLogout = React.useCallback(() => {
    sessionStorage.removeItem('rcvr_olt')
    sessionStorage.removeItem('rcvr_oid')
    router.replace('/')
  }, [router])

  return (
    <BusinessLayout title="Meine Betriebe">
      {owner && !owner.publicKey && (
        <>
          <Text fontWeight="xbold" color="red" mb={3}>
            Du hast noch keinen Schlüssel eingerichtet. Ohne Schlüssel kannst du
            keine QR Codes erstellen.
          </Text>
          <Link href="/business/setup/key-intro">
            <a css={{ textDeocration: 'none' }}>
              <Button title="Schlüssel erstellen" />
            </a>
          </Link>
        </>
      )}
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
      {owner && owner.publicKey && (
        <AddCard label="Betriebsname" onAdd={handleAddNewCompany} />
      )}

      <Box
        textAlign="center"
        fontSize="s"
        fontWeight="bold"
        color="bluegrey.800"
        mt={4}
      >
        <button
          type="button"
          css={{ color: 'inherit', textDecoration: 'none', fontWeight: 700 }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </Box>
    </BusinessLayout>
  )
}

export default Dashboard
