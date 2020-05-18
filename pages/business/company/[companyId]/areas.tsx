import * as React from 'react'
import { fetchCompany, postArea, patchCompany } from '@lib/api'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from 'react-query'
import AreaCard from '@ui/blocks/AreaCard'
import InputCard from '@ui/blocks/InputCard'
import AddCard from '@ui/blocks/AddCard'
import BusinessPageSwitcher from '@ui/blocks/BusinessPageSwitcher'
import BusinessLayout from '@ui/layouts/Business'
import { Box } from '@ui/base'

type AreasPageProps = {}

const AreasPage: React.FC<AreasPageProps> = () => {
  const router = useRouter()
  const companyId = router.query.companyId?.toString()
  const { data: company, refetch } = useQuery(
    companyId && ['company', companyId],
    (_key, cid) => fetchCompany(cid)
  )
  const [addArea] = useMutation(postArea)
  const [updateCompany] = useMutation(patchCompany)
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

  const handleChangeMenuLink = React.useCallback(
    async (newLink: string) => {
      let cleanLink = newLink
      if (!newLink.startsWith('http')) cleanLink = 'https://' + newLink
      if (!newLink) cleanLink = null
      await updateCompany({ id: companyId, menuLink: cleanLink })
      await refetch()
      alert('Erfolgreich gespeichert')
    },
    [companyId, updateCompany, refetch]
  )

  if (!company) return <BusinessLayout loading />

  return (
    <BusinessLayout title={company.name}>
      <BusinessPageSwitcher companyId={company.id} active="areas" />
      <InputCard
        id="menuLink"
        onSubmit={handleChangeMenuLink}
        value={company.menuLink}
        label="Link zur Speisekarte"
      />
      <Box height={3} />
      {company.areas.map((area) => (
        <AreaCard name={area.name} key={area.id} id={area.id} />
      ))}
      {tmpNewArea && <AreaCard name={tmpNewArea} loading />}
      <AddCard
        label='z.B. "Tisch 1" oder "Theke"'
        onAdd={handleAddNewPlace}
        id="areaName"
      />
    </BusinessLayout>
  )
}

export default AreasPage
