import Head from 'next/head'
import { useRouter } from 'next/router'
import * as React from 'react'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import usePageLocale from '~locales/usePageLocale'
import { ArrowsRight } from '~ui/anicons'
import { AffiliateCard } from '~ui/blocks/AffiliateCard'
import { Box, ButtonLink, Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'
import { BUILD_VARIANT } from '~ui/whitelabels'

const SetupIntro: React.FC = () => {
  const { t } = usePageLocale<'business/setup/intro'>()

  switch (BUILD_VARIANT) {
    case 'care':
    case 'health': {
      return (
        <>
          <p>{t('setupIntro1_care')}</p>
          <p>{t('setupIntro2_care')}</p>
        </>
      )
    }
    default: {
      return (
        <>
          <p>{t('setupIntro1')}</p>
          <p>{t('setupIntro2')}</p>
          <p>{t('setupIntro3')}</p>
        </>
      )
    }
  }
}

const SetupIntroPage: React.FC<WithOwnerProps> = () => {
  const { t } = usePageLocale<'business/setup/intro'>()
  const { query } = useRouter()

  React.useEffect(() => {
    if (query.affiliate) {
      localStorage.setItem('rcvr_affiliate', query.affiliate.toString())
    }
  }, [query.affiliate])

  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title"> {t('pageTitle')} </title>
      </Head>
      <Text as="h2" variant="h2">
        {t('instruction')}
      </Text>
      <Box height={6} />
      <Text>
        <SetupIntro />
      </Text>
      <Box height={12} />

      <ButtonLink
        href="/business/setup/signup"
        right={<ArrowsRight color="green" />}
      >
        {t('letsGo')}
      </ButtonLink>
      {query.affiliate && (
        <>
          <Box height={6} />
          <AffiliateCard code={query.affiliate.toString()} />
        </>
      )}
    </MobileApp>
  )
}

export default withOwner({ redirect: 'authorized' })(SetupIntroPage)
