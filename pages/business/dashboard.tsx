import * as React from 'react'
import { useOwner } from '@lib/db'
import BusinessLayout from '@ui/layouts/Business'
import { Card } from '@ui/base'

type DashboardProps = {}

const Dashboard: React.FC<DashboardProps> = () => {
  useOwner()

  return (
    <BusinessLayout title="Meine Firmen">
      <Card />
    </BusinessLayout>
  )
}

export default Dashboard
