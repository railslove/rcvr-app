import * as React from 'react'
import { Card, Row, Text, Icon, Box } from '~ui/core'
import { Add } from '~ui/svg'

interface Props {
  title?: string
}
type AC = React.FC<JSX.IntrinsicElements['button'] & Props>

export const AddCard: AC = ({ title = 'Hinzufügen', ...rest }) => {
  return (
    <button {...rest} css={{ textAlign: 'left' }}>
      <Card>
        <Row
          py={3}
          px={4}
          alignItems="center"
          width="100%"
          css={{
            cursor: 'pointer',
            filter: 'grayscale(0.7) opacity(0.5)',
            transition: 'all 170ms',
            '&:hover': { filter: 'grayscale(0) opacity(1)' },
          }}
        >
          <Icon icon={Add} size={5} />
          <Box width={2} />
          <Text variant="h5">{title}</Text>
        </Row>
      </Card>
    </button>
  )
}
