import * as React from 'react'
import { css } from '@styled-system/css'
import { Card, Row, Box } from '@ui/core'

interface ListProps {
  children?: React.ReactNode
}

export const DataList: React.FC<ListProps> = ({ children }) => {
  return <Card css={{ overflow: 'hidden' }}>{children}</Card>
}

interface ItemProps {
  children?: React.ReactNode
  left?: React.ReactNode
  right?: React.ReactNode
  color: string
}

export const DataListItem: React.FC<ItemProps> = ({ left, right, color }) => {
  return (
    <Row
      css={css({ borderBottom: '1px solid', borderColor: 'bluegrey.50' })}
      alignItems="center"
    >
      <Box
        width={2}
        alignSelf="stretch"
        my="-1px"
        css={css({ bg: color, opacity: 0.6 })}
      />
      <Box flex="1 1 auto" px={4} py={2}>
        {left}
      </Box>
      <Box flex="0 0 auto" px={4} py={2}>
        {right}
      </Box>
    </Row>
  )
}
