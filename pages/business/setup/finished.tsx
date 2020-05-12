import * as React from 'react'
import Head from 'next/head'
import { useOwner } from '@lib/db'
import Link from 'next/link'
import { Text, Button, Flex, Circle, Box } from '@ui/base'
import { Arrows, Check } from '@ui/icons'
import BusinessLayout from '@ui/layouts/Business'

type FinishedPageProps = {}

const FinishedPage: React.FC<FinishedPageProps> = () => {
  useOwner()

  return (
    <BusinessLayout>
      <Head>
        <title key="title">Fertig | recover</title>
      </Head>
      <Text fontSize="xl" fontWeight="bold" mb={5}>
        Du bist fertig!
      </Text>
      <Flex justify="center" mb={6}>
        <Circle color="green" animated>
          <Check animated />
        </Circle>
      </Flex>
      <Text fontSize="m" fontWeight="semibold" mb={3}>
        Super, dein Schlüssel wurde erfolgreich eingerichtet und dein Account
        wurde registriert.
      </Text>
      <Text fontSize="m" fontWeight="semibold" mb={3}>
        Wir melden uns bald bei Dir, um gemeinsam deine Daten zu überprüfen.
      </Text>
      <Text fontSize="m" fontWeight="semibold" mb={4}>
        In der Zwischenzeit kannst du schon Betriebe, Tische und QR Codes
        erstellen.
      </Text>
      <Box mb={4}>
        <Link href="/business/dashboard">
          <a css={{ textDeocration: 'none' }}>
            <Button
              title="Zur Übersicht"
              right={<Arrows size="16px" color="pink" />}
            />
          </a>
        </Link>
      </Box>
    </BusinessLayout>
  )
}

export default FinishedPage
