import * as React from 'react'
import Head from 'next/head'

import { Box, Text, Row } from '~ui/core'
import { Circle } from '~ui/anicons'
import { Phone } from '~ui/svg'
import { MobileApp } from '~ui/layouts/MobileApp'
import { FixedBottomBar } from '~ui/blocks/BottomBar'

export default function CoronaPage() {
  return (
    <MobileApp>
      <Head>
        <title key="title">Corona, was nun? | recover</title>
      </Head>
      <Text as="h2" variant="h2">
        Was sollte ich tun, wenn ich Kontaktperson bin?
      </Text>
      <Box height={5} />
      <Text>
        <p>Zu allererst: ruhig bleiben.</p>
        <p>
          Wenn Du eine bestätigte Kontaktperson bist, wird sich das
          Gesundheitsamt bei dir telefonisch innerhalb von 48 Stunden melden.
        </p>
        <p>
          Falls Du bereits typische Symptome wie Fieber, Müdigkeit und trockenen
          Husten hast, solltest du vorsichtshalber in Haus-Quarantäne bleiben
          und das Gesundheitsamt informieren.
        </p>
      </Text>
      <Box height={6} />
      <Row>
        <Circle size={36} color="red.400">
          <Phone />
        </Circle>
        <Box ml={3}>
          <Text variant="h3">Bürgertelefon zum Coronavirus</Text>
          <Text variant="h2">
            <a href="tel:021191191001">0211 / 9119 1001</a>
          </Text>
        </Box>
      </Row>
      <Box height={6} />
      <Text variant="h3">Noch Fragen?</Text>
      <Box height={2} />
      <Text>
        <p>
          Eine Vielzahl von ständig aktualisierten Informationen gibt es auf der
          Internetseite des nordrhein-westfälischen Gesundheitsministeriums:{' '}
          <a
            href="https://www.mags.nrw/coronavirus"
            target="blank"
            rel="noopener noreferrer"
          >
            www.mags.nrw/coronavirus
          </a>
          . Dort finden sich insbesondere auch Links zu den
          Informationsangeboten der Bundeszentrale für gesundheitliche
          Aufklärung und des Robert-Koch-Instituts.
        </p>
      </Text>
      <FixedBottomBar transparent />
    </MobileApp>
  )
}
