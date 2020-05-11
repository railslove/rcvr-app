import * as React from 'react'
import Link from 'next/link'
import { fetchCompany, postArea } from '@lib/api'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from 'react-query'
import { Box } from '@ui/base'
import AreaCard from '@ui/blocks/AreaCard'
import AddCard from '@ui/blocks/AddCard'
import BusinessLayout from '@ui/layouts/Business'

type CompanyPageProps = {}

const CompanyPage: React.FC<CompanyPageProps> = () => {
  const router = useRouter()
  const companyId = router.query.companyId?.toString()
  const { data: company, refetch } = useQuery(
    companyId && ['company', companyId],
    (_key, cid) => fetchCompany(cid)
  )
  const [addArea] = useMutation(postArea)
  const [tmpNewArea, setTmpNewArea] = React.useState<string | undefined>()

  const handleAddNewPlace = React.useCallback(
    async (areaName) => {
      setTmpNewArea(areaName)
      await addArea({ name: areaName, companyId })
      await refetch()
      setTmpNewArea(undefined)
    },
    [addArea, refetch, companyId]
  )

  if (!company) return <BusinessLayout loading />

  return (
    <BusinessLayout title={company.name}>
      <Box fontSize="s" fontWeight="bold" color="bluegrey.800" mb={5} mt={-3}>
        <Link href="/business/dashboard">
          <a css={{ color: 'inherit', textDecoration: 'none' }}>&lt; Zurück</a>
        </Link>
      </Box>
      {company.areas.map((area) => (
        <AreaCard name={area.name} key={area.id} id={area.id} />
      ))}
      {tmpNewArea && <AreaCard name={tmpNewArea} loading />}
      <AddCard
        label="Tischnummer / Platz / Bereich"
        onAdd={handleAddNewPlace}
      />
    </BusinessLayout>
  )
}

export default CompanyPage
