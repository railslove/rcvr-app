import React from 'react'

import { Text, Box, Row } from '~ui/core'
import { Circle, Question } from '~ui/anicons'
import { MobileApp } from '~ui/layouts/MobileApp'
import { RECOVER_TEAM_EMAIL } from '~locales/constants'
import useLocale from '~locales/useLocale'

import locales from './404.locales'

export default function Custom404() {
  const t = useLocale(locales)

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
          {t('message')}{' '}
          <a href={`mailto:${RECOVER_TEAM_EMAIL}`}>{RECOVER_TEAM_EMAIL}</a>.
        </p>
      </Text>
    </MobileApp>
  )
}
