import * as React from 'react'
import { Card, Text, Flex } from '@ui/base'
import { Arrows } from '@ui/icons'

type CompanyCardProps = {
  loading?: boolean
  name: string
}

const CompanyCard: React.FC<CompanyCardProps> = ({ name, loading }) => {
  return (
    <Card mb={3} opacity={loading ? 0.5 : 1}>
      <Flex align="center">
        <Text fontSize="m" fontWeight="bold" flex={1}>
          {name}
        </Text>
        <Arrows color="green" width="16px" height="16px" />
      </Flex>
    </Card>
  )
}

export default CompanyCard
