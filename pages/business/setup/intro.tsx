import * as React from 'react'
import Head from 'next/head'
import { useOwner } from '@lib/db'
import { Text, Button } from '@ui/base'
import Link from 'next/link'
import { Arrows } from '@ui/icons'
import BusinessLayout from '@ui/layouts/Business'

type IntroPageProps = {}

const IntroPage: React.FC<IntroPageProps> = () => {
  useOwner()

  return (
    <BusinessLayout>
      <Head>
        <title key="title">Willkommen bei recover</title>
      </Head>
      <Text fontSize="xl" fontWeight="bold" mb={5}>
        Willkommen bei Recover.
      </Text>
      <Text fontSize="m" fontWeight="bold" mb={4}>
        Zuerst kümmern wir uns um den Schutz deiner Kundendaten.
      </Text>
      <Text fontSize="m" fontWeight="bold" mb={4}>
        Danach kannst du QR Codes generieren, mit denen Gäste in deinen
        Betrieben einchecken können.
      </Text>
      <Text fontSize="m" color="red" fontWeight="xbold" mb={4}>
        Nimm dir etwas Zeit und befolge den nächsten Schritt sorgfältig.
      </Text>
      <Link href="/business/setup/keys">
        <a css={{ textDeocration: 'none' }}>
          <Button title="Starten" right={<Arrows size="16px" color="pink" />} />
        </a>
      </Link>
    </BusinessLayout>
  )
}

export default IntroPage
