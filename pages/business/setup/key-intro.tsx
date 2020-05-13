import * as React from 'react'
import Head from 'next/head'
import { useOwner } from '@lib/db'
import { Text, Button, Flex, Circle, Box } from '@ui/base'
import Link from 'next/link'
import { Arrows, LockShield } from '@ui/icons'
import BusinessLayout from '@ui/layouts/Business'

type KeyIntroPageProps = {}

const KeyIntroPage: React.FC<KeyIntroPageProps> = () => {
  useOwner()

  return (
    <BusinessLayout>
      <Head>
        <title key="title">Sicherheit bei recover</title>
      </Head>
      <Text fontSize="xl" fontWeight="bold" mb={5}>
        Wir schützen deine Kundendaten.
      </Text>
      <Flex justify="center" mb={5}>
        <Circle color="green">
          <LockShield />
        </Circle>
      </Flex>
      <Text fontSize="m" fontWeight="semibold" mb={3}>
        Im nächsten Schritt kümmern wir uns um die Verschlüsselung der Daten
        deiner Gäste. Dafür erstellen wir ein digitales Schlüsselpaar.
      </Text>
      <Text fontSize="m" fontWeight="semibold" mb={3}>
        Das digitale Schlüsselpaar besteht aus einem öffentlichen und einem
        privaten Schlüssel. Der{' '}
        <Text as="span" fontWeight="xbold">
          öffentliche Schlüssel
        </Text>{' '}
        befindet sich in den QR Codes, die du im Anschluss herunterladen kannst
        und auf deinen Tischen auslegst. Mit den QR Codes werden beim Checkin
        die Daten deiner Gäste automatisch verschlüsselt, bevor sie gespeichert
        werden.
      </Text>
      <Text fontSize="m" fontWeight="semibold" mb={3}>
        Mit dem öffentlichen Schlüssel kann man die Daten aber nur
        verschlüsseln, nicht wieder entschlüsseln. Deshalb gibt es zum
        entschlüsseln den{' '}
        <Text as="span" fontWeight="xbold">
          privaten Schlüssel
        </Text>
        . Er ist nur für dich bestimmt. Er wird auf deinem Gerät erstellt und
        nicht über das Internet übertragen. Du brauchst ihn, um die Daten deiner
        Gäste wieder entschlüsseln zu können.{' '}
      </Text>
      <Text fontSize="m" fontWeight="xbold" mb={3}>
        Daher ist es sehr wichtig, dass du Dir den Schlüssel im nächsten Schritt
        aufschreibst und sicher verwahrst.
      </Text>
      <Text fontSize="m" fontWeight="semibold" mb={4}>
        Kann{"'"}s losgehen? Dann machen wir gemeinsam weiter!
      </Text>
      <Box mb={3}>
        <Link href="/business/setup/keys">
          <a css={{ textDeocration: 'none' }}>
            <Button
              title="Schlüssel erstellen"
              right={<Arrows size="16px" color="pink" />}
            />
          </a>
        </Link>
      </Box>
    </BusinessLayout>
  )
}

export default KeyIntroPage
