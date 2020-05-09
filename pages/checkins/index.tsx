import * as React from 'react'
import AppLayout from '@ui/layouts/App'
import CardList from '@ui/blocks/CardList'

type CheckinsIndexProps = {}

const CheckinsIndex: React.FC<CheckinsIndexProps> = (props) => {
  return (
    <AppLayout>
      <CardList />
    </AppLayout>
  )
}

export default CheckinsIndex
