import * as React from 'react'
import Head from 'next/head'
import { useOwner } from '@lib/db'
import Link from 'next/link'
import { Text, Button, Flex, Circle } from '@ui/base'
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
        Erfolgreich abgeschlossen.
      </Text>
      <Flex justify="center" mb={6}>
        <Circle color="green">
          <Check animated />
        </Circle>
      </Flex>
      <Text fontSize="m" fontWeight="bold" mb={3}>
        Vielen Dank, dein Schlüssel wurde erfolgreich eingerichtet.
      </Text>
      <Text fontSize="m" fontWeight="bold" mb={5}>
        Du kannst recover nun für deine Betriebe nutzen.
      </Text>
      <Link href="/business/dashboard">
        <a css={{ textDeocration: 'none' }}>
          <Button
            title="Zur Übersicht"
            right={<Arrows size="16px" color="pink" />}
          />
        </a>
      </Link>
    </BusinessLayout>
  )
}

export default FinishedPage
