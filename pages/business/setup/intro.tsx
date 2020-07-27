import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { isCareEnv } from '~lib/config'
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
        <title key="title">
          Für {isCareEnv ? 'Pflegeeinrichtungen' : 'Betriebe'} | recover
        </title>
      </Head>
      <Text as="h2" variant="h2">
        {isCareEnv
          ? 'So nutzen Sie recover für Ihre Pflegeeinrichtung'
          : 'So nutzt Du recover für deinen Betrieb'}
      </Text>
      <Box height={6} />
      <Row justifyContent="center">
        <Step1 />
      </Row>
      <Box height={6} />
      <Text>
        <p>
          {isCareEnv
            ? 'Die Corona-Verordnungen schreiben vor, dass Sie eine Liste der Kontaktdaten Ihrer Gäste führen. Mit recover führen Sie diese Liste digital. Um die Daten Ihrer Gäste zu schützen, werden sie von der App verschlüsselt. Während des Onboardings erstellen Sie daher in wenigen Schritten ein digitales Schlüsselpaar.'
            : 'Die aktuelle Corona-Verordnung in NRW schreibt vor, dass Du eine Liste der Kontaktdaten deiner Gäste führst. Mit recover führst Du diese Liste digital. Um die Daten deiner Gäste zu schützen, werden sie von der App verschlüsselt. Während des Onboardings erstellst Du daher in wenigen Schritten ein digitales Schlüsselpaar.'}
        </p>
        <p>
          {isCareEnv
            ? 'Nach dem Onboarding können Sie sich bei uns melden um zusammen mit unserem Team die Echtheit Ihrer Daten zu prüfen'
            : 'Nach dem Onboarding kannst Du dich bei uns melden um zusammen mit unserem Team die Echtheit deiner Daten zu prüfen'}
        </p>
        <p>
          {isCareEnv
            ? 'Die Einrichtung von recover dauert ca. 10 Min. Sind Sie bereit? Dann lassen Sie uns starten.'
            : 'Die Einrichtung von recover dauert ca. 10 Min. Bist Du bereit? Dann lass uns starten.'}
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
