import * as React from 'react'
import Head from 'next/head'
import { useOwner } from '@lib/db'
import { Text, Button, Flex, Circle } from '@ui/base'
import Link from 'next/link'
import { Arrows, Check } from '@ui/icons'
import BusinessLayout from '@ui/layouts/Business'

type SuccessPageProps = {}

const SuccessPage: React.FC<SuccessPageProps> = () => {
  useOwner()

  return (
    <BusinessLayout>
      <Head>
        <title key="title">Willkommen bei recover</title>
      </Head>
      <Text fontSize="xl" fontWeight="bold" mb={5}>
        Toll, dass du dabei bist!
      </Text>
      <Flex justify="center" mb={5}>
        <Circle color="green" animated>
          <Check animated />
        </Circle>
      </Flex>
      <Text fontSize="m" fontWeight="semibold" mb={3}>
        Wir freuen uns, dass du recover einsetzen möchtest! Um die Echtheit
        deiner Daten mit Dir zu überprüfen, werden wir uns per Email bei dir
        melden.
      </Text>
      <Text fontSize="m" fontWeight="semibold" mb={5}>
        Im nächsten Schritt kümmern wir uns um die Verschlüsselung deiner
        Kundendaten.
      </Text>
      <Link href="/business/setup/key-intro">
        <a css={{ textDeocration: 'none' }}>
          <Button title="Weiter" right={<Arrows size="16px" color="pink" />} />
        </a>
      </Link>
    </BusinessLayout>
  )
}

export default SuccessPage
