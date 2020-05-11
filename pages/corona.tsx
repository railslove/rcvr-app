import * as React from 'react'
import Head from 'next/head'
import { Text, Box, Flex, Circle } from '@ui/base'
import { Phone } from '@ui/icons'
import AppLayout from '@ui/layouts/App'

type CoronaPageProps = {}

const CoronaPage: React.FC<CoronaPageProps> = () => {
  return (
    <AppLayout sticky={false}>
      <Head>
        <title key="title">Corona, was nun? | recover</title>
      </Head>
      <Box px={4} py={4}>
        <Text fontSize="l" fontWeight="bold" mb={2}>
          Ich bin eine mögliche Kontaktperson
        </Text>
        <Text mb={3}>Zu allererst: ruhig bleiben.</Text>
        <Text fontWeight="bold" mb={2}>
          Was nun?
        </Text>
        <Text mb={2}>
          Das Gesundheitsamt wird sich telefonisch innerhalb von 48 Stunden bei
          Ihnen melden.
        </Text>
        <Text mb={4}>
          Falls Sie bereits typische Symptome wie Fieber, Müdigkeit und
          trockenen Husten aufweisen, sollten Sie vorsichtshalber in
          Haus-Quarantäne bleiben und das Gesundheitsamt informieren.
        </Text>
        <Flex mb={4}>
          <Circle color="red" size={5}>
            <Phone />
          </Circle>
          <Box ml={3}>
            <Text fontWeight="bold">Bürgertelefon zum Coronavirus</Text>
            <a href="tel:021191191001">
              <Text fontSize="l" fontWeight="xbold">
                0211 / 9119 1001
              </Text>
            </a>
          </Box>
        </Flex>
        <Text fontWeight="bold" mb={2}>
          Noch Fragen?
        </Text>
        <Text fontSize="s" lineHeight={1.5}>
          Eine Vielzahl von ständig aktualisierten Informationen gibt es auf der
          Internetseite des nordrhein-westfälischen Gesundheitsministeriums:{' '}
          <a
            href="https://www.mags.nrw/coronavirus"
            css={{ color: '#226EEC', textDecoration: 'underline' }}
          >
            www.mags.nrw/coronavirus
          </a>
          . Dort finden sich insbesondere auch Links zu den
          Informationsangeboten der Bundeszentrale für gesundheitliche
          Aufklärung und des Robert-Koch-Instituts.
        </Text>
      </Box>
    </AppLayout>
  )
}

export default CoronaPage
