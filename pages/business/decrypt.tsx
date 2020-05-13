import * as React from 'react'
import Link from 'next/link'
import { useOwner } from '@lib/db'
import { Box, Text, Button } from '@ui/base'
import BusinessLayout from '@ui/layouts/Business'
import AddCard from '@ui/blocks/AddCard'
import CompanyCard from '@ui/blocks/CompanyCard'

type DashboardProps = {}

const Dashboard: React.FC<DashboardProps> = () => {
  const { owner } = useOwner()
  const [privateKey, setPrivateKey] = React.useState<string | undefined>(
    owner.privateKey
  )

  console.log({ privateKey })

  return (
    <BusinessLayout title="Daten entschlüsseln">
      <Text>
        Wenn du von uns ein Datenpaket bekommen hast, kannst du es hier
        entschlüsseln.
      </Text>
    </BusinessLayout>
  )
}

export default Dashboard
