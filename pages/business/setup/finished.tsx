import * as React from 'react'

import { withOwner } from '~lib/pageWrappers'
import { Text, Box, Row, ButtonLink } from '~ui/core'
import { Circle, Check, ArrowsRight, ArrowsLeft } from '~ui/anicons'
import { MobileApp } from '~ui/layouts/MobileApp'
import { BUILD_VARIANT } from '~ui/whitelabels'
import usePageLocale from '~locales/usePageLocale'

const FinishedText: React.FC = () => {
  const { t } = usePageLocale('business/setup/finished')

  switch (BUILD_VARIANT) {
    case 'care': {
      return (
        <>
          <p>{t('finishedText1_care')}</p>
          <p>
            {t('finishedText2_care')}:{'  '}
            <a href={`tel:${t('bfsServiceValue')}`}>{t('bfsServiceText')}</a>
          </p>
          <p>{t('finishedText3_formal')}</p>
        </>
      )
    }
    case 'health': {
      return (
        <>
          <p>{t('finishedText1_health')}</p>
          <p>{t('finishedText2_health')}</p>
          <p>
            {t('finishedText2_health')}:{'  '}
            <a href={`tel:${t('bfsServiceValue')}`}>{t('bfsServiceText')}</a>
          </p>
          <p>{t('finishedText3_formal')}</p>
        </>
      )
    }
    default: {
      return (
        <>
          <p>{t('finishedText1')}</p>
          <p>{t('finishedText2')}</p>
          <p>{t('finishedText3')}</p>
        </>
      )
    }
  }
}

function SetupSuccessPage() {
  const { t } = usePageLocale('business/setup/finished')

  return (
    <MobileApp pageTitle={t('pageTitle')} logoVariant="big">
      <Text as="h2" variant="h2">
        {t('header')}
      </Text>
      <Box height={10} />
      <Row justifyContent="center">
        <Circle animated delay={0.5} color="green">
          <Check delay={0.8} css={{ position: 'relative', top: 2 }} />
        </Circle>
      </Row>
      <Box height={10} />
      <Text>
        <FinishedText />
      </Text>
      <Box height={6} />

      <ButtonLink
        href="/business/dashboard"
        right={<ArrowsLeft color="green" />}
        left={<ArrowsRight color="green" />}
      >
        {t('startButtonText')}
      </ButtonLink>
    </MobileApp>
  )
}

export default withOwner()(SetupSuccessPage)
