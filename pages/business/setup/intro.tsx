import * as React from 'react'
import { useAffiliate } from '~lib/hooks/useAffiliate'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import usePageLocale from '~locales/usePageLocale'
import { ArrowsRight } from '~ui/anicons'
import { AffiliateCard } from '~ui/blocks/AffiliateCard'
import { Box, ButtonLink, Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'
import { BUILD_VARIANT } from '~ui/whitelabels'

const SetupIntro: React.FC = () => {
  const { t } = usePageLocale('business/setup/intro')

  switch (BUILD_VARIANT) {
    case 'care':
    case 'health': {
      return (
        <>
          <p>{t('setupIntroCareHealth1')}</p>
          <p>{t('setupIntroCareHealth2')}</p>
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
  const { t } = usePageLocale('business/setup/intro')
  const { affiliateName, isAffiliate } = useAffiliate()

  return (
    <MobileApp pageTitle={t('pageTitle')} logoVariant="big">
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
      {isAffiliate && (
        <>
          <Box height={6} />
          <AffiliateCard code={affiliateName} />
        </>
      )}
    </MobileApp>
  )
}

export default withOwner({ redirect: 'authorized' })(SetupIntroPage)
