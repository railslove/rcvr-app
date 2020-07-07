import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { Text, Box, Row, ButtonLink } from '~ui/core'
import { ArrowsRight } from '~ui/anicons'
import { Step1 } from '~ui/svg'
import { MobileApp } from '~ui/layouts/MobileApp'

const SetupIntroPage: React.FC<WithOwnerProps> = () => {
  const { query } = useRouter()

  React.useEffect(() => {
    if (query.affiliate) {
      localStorage.setItem('rcvr_affiliate', query.affiliate.toString())
    }
  }, [query.affiliate])

  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">Für Betriebe | recover</title>
      </Head>
      <Text as="h2" variant="h2">
        So nutzten Sie recover für Ihren Betrieb
      </Text>
      <Box height={6} />
      <Row justifyContent="center">
        <Step1 />
      </Row>
      <Box height={6} />
      <Text>
        <p>
          Die aktuelle Corona-Verordnung in NRW schreibt vor, dass Sie eine Liste
          der Kontaktdaten Ihrer Besucher und Gäste führen. Mit recover führen Sie diese
          Liste digital. Um die Daten Ihrer Besucher und Gäste zu schützen, werden sie von
          der App verschlüsselt. Während des Onboardings erstellen Sie daher in
          wenigen Schritten ein digitales Schlüsselpaar.
        </p>
        <p>
          Nach dem Onboarding wird sich unser Team bei Ihnen melden und die
          Echtheit Ihrer Daten mit Ihnen gemeinsam überprüfen.
        </p>
        <p>
          Die Einrichtung von recover dauert ca. 10 Min. sind Sie bereit? Dann
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

export default withOwner({ redirect: 'authorized' })(SetupIntroPage)
