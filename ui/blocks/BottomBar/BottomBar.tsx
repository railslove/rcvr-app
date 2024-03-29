import * as React from 'react'
import Link from '~ui/core/Link/Link'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { css } from '@styled-system/css'
import { variant } from 'styled-system'

import { isHealthEnv } from '~lib/config'
import { PRIVACY_URL, secondaryHighlightColor } from '~ui/whitelabels'
import { Box, Text } from '~ui/core'
import { Circle } from '~ui/anicons'
import { Lock, Ticket, Virus } from '~ui/svg'

import useLocaleObject from '~locales/useLocaleObject'
import bottomBarLocales from '~ui/blocks/BottomBar/BottomBar.locales'

export const BottomBar: React.FC = () => {
  const { route } = useRouter()
  const { t } = useLocaleObject(bottomBarLocales)

  return (
    <Row>
      <Tab href={PRIVACY_URL} target="_blank" rel="noreferrer noopener">
        <Circle color="transparent" size={38}>
          <Lock css={{ marginTop: '-2px' }} />
        </Circle>
        <Text variant="fineprint" fontWeight="semibold">
          {t('dataPrivacyTabText')}
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
            {t('finePrintText')}
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
            {t('coronaTabText')}
          </Text>
        </Tab>
      </Link>
    </Row>
  )
}

export type FixedBottomBarProps = {
  transparent?: boolean
}

export const FixedBottomBar: React.FC<FixedBottomBarProps> = ({
  transparent,
}) => {
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
