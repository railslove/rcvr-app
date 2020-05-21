import * as React from 'react'
import Head from 'next/head'
import { MobileApp } from '@ui/layouts/MobileApp'
import { Text, Box, Row, ButtonLink } from '@ui/core'
import { ArrowsRight } from '@ui/anicons/Arrows'
import Step1 from '@ui/svg/step-1.svg'

export default function SetupIntroPage() {
  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">Für Betriebe | recover</title>
      </Head>
      <Text as="h2" variant="h2">
        So nutzt Du recover für deinen Betrieb
      </Text>
      <Box height={6} />
      <Row justifyContent="center">
        <Step1 />
      </Row>
      <Box height={6} />
      <Text>
        <p>
          Die aktuelle Corona-Verordnung in NRW schreibt vor, dass Du eine Liste
          der Kontaktdaten deiner Gäste führst. Mit recover führst Du diese
          Liste digital. Um die Daten deiner Gäste zu schützen, werden sie von
          der App verschlüsselt. Während des Onboardings erstellst Du daher in
          wenigen Schritten ein digitales Schlüsselpaar.
        </p>
        <p>
          Nach dem Onboarding wird sich unser Team bei Dir melden und die
          Echtheit deiner Daten mit Dir gemeinsam überprüfen.
        </p>
        <p>
          Die Einrichtung von recover dauert ca. 10 Min. Bist Du bereit? Dann
          lass uns starten.
        </p>
      </Text>
      <Box height={6} />

      <ButtonLink
        href="/business/setup/signup"
        right={<ArrowsRight color="green" />}
      >
        Los geht{"'"}s
      </ButtonLink>
    </MobileApp>
  )
}
