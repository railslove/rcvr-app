import * as React from 'react'
import { Card, Text, Flex } from '@ui/base'
import { QrCode, Download } from '@ui/icons'

type AreaCardProps = {
  loading?: boolean
  name: string
  id?: string
}

const AreaCard: React.FC<AreaCardProps> = ({ name, loading, id }) => {
  return (
    <Card mb={3} opacity={loading ? 0.5 : 1}>
      <Flex align="center">
        <Text fontSize="m" fontWeight="bold" flex={1}>
          {name}
        </Text>
        {id && (
          <Flex flexGrow={0} flexShrink={0} align="center" ml={3}>
            <a
              css={{ display: 'block', marginRight: 14, height: 20 }}
              href={process.env.apiBase + 'areas/' + id + '.pdf'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <QrCode width="20px" height="20px" />
            </a>
            <a
              css={{ display: 'block' }}
              href={process.env.apiBase + 'areas/' + id + '.pdf'}
              download
            >
              <Download />
            </a>
          </Flex>
        )}
      </Flex>
    </Card>
  )
}

export default AreaCard
