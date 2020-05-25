import * as React from 'react'

import { Text, Box, Row } from '~ui/core'
import { Circle, Question } from '~ui/anicons'
import { MobileApp } from '~ui/layouts/MobileApp'

export default function Custom404() {
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
        Seite nicht gefunden
      </Text>
      <Box height={8} />
      <Text textAlign="center">
        <p>
          Die Seite, die du aufgerufen hast, existiert nicht. Hätte das nicht
          passieren sollen? Dann schreib uns eine Mail an{' '}
          <a href="mailto:team@recoverapp.de">team@recoverapp.de</a>.
        </p>
      </Text>
    </MobileApp>
  )
}
