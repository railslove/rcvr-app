import * as React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { css } from '@styled-system/css'
import { variant } from 'styled-system'

import { isCareEnv, isHealthEnv } from '~lib/config'
import { privacyUrl, secondaryHighlightColor } from '~ui/whitelabels'
import { Box, Text } from '~ui/core'
import { Circle } from '~ui/anicons'
import { Lock, Ticket, Virus } from '~ui/svg'

export const BottomBar: React.FC<Record<string, never>> = () => {
  const { route } = useRouter()

  return (
    <Row>
      <Tab href={privacyUrl} target="_blank" rel="noreferrer noopener">
        <Circle color="transparent" size={38}>
          <Lock css={{ marginTop: '-2px' }} />
        </Circle>
        <Text variant="fineprint" fontWeight="semibold">
          Datenschutz
        </Text>
      </Tab>
      <Link href="/my-checkins" passHref>
        <Tab>
          <Circle
            color={
              route === '/my-checkins'
                ? isHealthEnv
                  ? secondaryHighlightColor
                  : 'yellow.400'
                : 'transparent'
            }
            size={38}
          >
            <Ticket />
          </Circle>
          <Text variant="fineprint" fontWeight="semibold">
            {isCareEnv || isHealthEnv ? 'Checkins' : 'Tickets'}
          </Text>
        </Tab>
      </Link>
      <Link href="/corona" passHref>
        <Tab>
          <Circle
            color={route === '/corona' ? 'red.400' : 'transparent'}
            size={38}
          >
            <Virus />
          </Circle>
          <Text variant="fineprint" fontWeight="semibold">
            Corona
          </Text>
        </Tab>
      </Link>
    </Row>
  )
}

interface Props {
  transparent?: boolean
}

export const FixedBottomBar: React.FC<Props> = ({ transparent }) => {
  return (
    <>
      <Box height={16} />
      <Fix variant={transparent ? 'transparent' : 'white'}>
        <BottomBar />
      </Fix>
    </>
  )
}

const Tab = styled('a')(
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: 4,
    height: '58px',
    flex: '1 0 0',
  })
)

const Row = styled('div')(
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    px: 4,
  })
)

const Fix = styled('div')(
  css({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    maxWidth: '420px',
    mx: 'auto',
  }),
  variant({
    variants: {
      white: {
        bg: 'white',
        '&::before': {
          content: '""',
          display: 'block',
          position: 'relative',
          top: -4,
          left: 0,
          right: 0,
          height: 4,
          backgroundImage:
            'linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
        },
      },
      transparent: {},
    },
  })
)
