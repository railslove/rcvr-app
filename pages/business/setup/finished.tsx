import * as React from 'react'
import { useOwner } from '@lib/db'
import Link from 'next/link'
import { Box, Text, Button, Flex, Circle } from '@ui/base'
import { Arrows, Check } from '@ui/icons'
import AppLayout from '@ui/layouts/App'

type FinishedPageProps = {}

const FinishedPage: React.FC<FinishedPageProps> = () => {
  useOwner()

  return (
    <AppLayout withTabs={false}>
      <Box px={4} py={5}>
        <Text fontSize="xl" fontWeight="bold" mb={5}>
          Erfolgreich abgeschlossen.
        </Text>
        <Flex justify="center" mb={6}>
          <Circle color="green">
            <Check animated />
          </Circle>
        </Flex>
        <Text fontSize="m" fontWeight="bold" mb={3}>
          Vielen Dank, ihr Schlüssel wurde erfolgreich eingerichtet.
        </Text>
        <Text fontSize="m" fontWeight="bold" mb={5}>
          Sie können recover nun für ihre Geschäfte nutzen.
        </Text>
        <Link href="/business/dashboard">
          <a css={{ textDeocration: 'none' }}>
            <Button
              title="Zur Übersicht"
              right={<Arrows size="16px" color="pink" />}
            />
          </a>
        </Link>
      </Box>
    </AppLayout>
  )
}

export default FinishedPage
