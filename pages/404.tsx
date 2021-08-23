import React from 'react'

import { Text, Box, Row } from '~ui/core'
import { Circle, Question } from '~ui/anicons'
import { MobileApp } from '~ui/layouts/MobileApp'

import usePageLocale from '~locales/usePageLocale'
import RecoverTeamEmailLink from '~ui/core/Link/RecoverTeamEmailLink'

export default function Custom404() {
  const { t } = usePageLocale<'404'>()

  return (
    <MobileApp logoVariant="big">
      <Box height={10} />
      <Row justifyContent="center">
        <Circle animated color="yellow.400">
          <Question animated delay={0.5} />
        </Circle>
      </Row>
      <Box height={10} />
      <Text textAlign="center" as="h2" variant="h2">
        {t('title')}
      </Text>
      <Box height={8} />
      <Text textAlign="center">
        <p>
          {t('message')} <RecoverTeamEmailLink />.
        </p>
      </Text>
    </MobileApp>
  )
}
