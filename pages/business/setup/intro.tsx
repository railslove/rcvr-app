import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { Text, Box, Row, ButtonLink } from '~ui/core'
import { ArrowsRight } from '~ui/anicons'
import { Step1 } from '~ui/svg'
import { MobileApp } from '~ui/layouts/MobileApp'
import { instruction, title, setupIntro } from '~ui/whitelabels'

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
        <title key="title"> {title} </title>
      </Head>
      <Text as="h2" variant="h2">
        {instruction}
      </Text>
      <Box height={6} />
      <Row justifyContent="center">
        <Step1 />
      </Row>
      <Box height={6} />
      <Text>{setupIntro}</Text>
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
