import * as React from 'react'

import { Button, Box, Text, Card } from '~ui/core'
import { ArrowsRight } from '~ui/anicons'

type ConfirmationProps = {
  onSubmit: () => void
}

export const Confirmation: React.FC<ConfirmationProps> = ({ onSubmit }) => {
  return (
    <Card variant="form" mx={-4}>
      <Text variant="h3" as="h3">
        Checkin nur ohne Symptome
      </Text>
      <Box height={5} />
      <Text>
        <p>
          Sie dürfen hier nur einchecken, wenn Sie keine Symptome von COVID19
          aufweisen.
        </p>
        <p>
          Klicken Sie auf Weiter um zu bestätigen, dass Sie keine Symptome aufweisen.
        </p>
      </Text>
      <Box height={5} />
      <Button
        type="button"
        onClick={onSubmit}
        css={{ width: '100%' }}
        right={<ArrowsRight color="green" />}
      >
        Weiter
      </Button>
    </Card>
  )
}
