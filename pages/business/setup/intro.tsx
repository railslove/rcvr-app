import * as React from 'react'
import Head from 'next/head'
import { Text, Button, Circle, Flex, Box } from '@ui/base'
import Link from 'next/link'
import { Arrows, Shop } from '@ui/icons'
import BusinessLayout from '@ui/layouts/Business'

type IntroPageProps = {}

const IntroPage: React.FC<IntroPageProps> = () => {
  return (
    <BusinessLayout>
      <Head>
        <title key="title">recover für deinen Betrieb</title>
      </Head>
      <Text fontSize="xl" fontWeight="bold" mb={5}>
        So nutzt Du recover für deinen Betrieb
      </Text>
      <Flex justify="center" mb={5}>
        <Circle color="pink">
          <Shop />
        </Circle>
      </Flex>
      <Text fontSize="m" fontWeight="semibold" mb={3}>
        Die aktuelle Corona-Verordnung in NRW schreibt vor, dass Du eine Liste
        der Kontaktdaten deiner Gäste führst. Mit recover führst Du diese Liste
        digital. Um die Daten deiner Gäste zu schützen, werden sie von der App
        verschlüsselt. Während des Onboardings erstellst Du daher in wenigen
        Schritten ein digitales Schlüsselpaar.
      </Text>
      <Text fontSize="m" fontWeight="semibold" mb={3}>
        Nach dem Onboarding wird sich unser Team bei Dir melden und die Echtheit
        deiner Daten mit Dir gemeinsam überprüfen.
      </Text>
      <Text fontSize="m" fontWeight="semibold" mb={4}>
        Die Einrichtung von recover dauert ca. 10 Min. Bist Du bereit? Dann lass
        uns starten.
      </Text>
      <Box mb={4}>
        <Link href="/business/setup/signup">
          <a css={{ textDeocration: 'none' }}>
            <Button
              title="Los geht's"
              right={<Arrows size="16px" color="pink" />}
            />
          </a>
        </Link>
      </Box>
    </BusinessLayout>
  )
}

export default IntroPage
