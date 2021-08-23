import * as React from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import { variant } from 'styled-system'
import { motion } from 'framer-motion'

import { Box } from '~ui/core'
import { SharedMeta } from '~ui/blocks/SharedMeta'
import LanguageSwitcher from '~ui/blocks/LanguageSwitcher'
import StadtKoelnLogo from '~ui/logos/StadtKoelnLogo'
import PageTitle from '~ui/blocks/Title/PageTitle'
import Logo, { LOGO_DIMENSIONS } from '~ui/blocks/Logo/Logo'

interface Props {
  children: React.ReactNode
  logoVariant?: 'big' | 'small' | 'sticky'
  secondaryLogo?: string
}

export const MobileApp: React.FC<Props> = ({
  children,
  logoVariant = 'small',
  secondaryLogo = null,
}) => {
  return (
    <>
      <Limit>
        <Head>
          <PageTitle key="title" />
        </Head>
        <SharedMeta />
        <Box display="flex" justifyContent="flex-end">
          <LanguageSwitcher />
        </Box>
        <Box height={4} />
        <Box display="flex" alignItems="center">
          <LogoContainer variant={logoVariant}>
            <LogoBox variant={logoVariant} layoutId="appLogo">
              <Logo />
            </LogoBox>
            {secondaryLogo ? (
              <SecondaryLogoBox>
                <SecondaryLogo src={secondaryLogo} />
              </SecondaryLogoBox>
            ) : null}
          </LogoContainer>
          <StadtKoelnLogo />
        </Box>
        <Box height={logoVariant === 'sticky' ? 10 : 4} />
        {children}
      </Limit>
    </>
  )
}

const Limit = styled('div')(
  css({
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
    p: 8,
    width: '100%',
    maxWidth: '420px',
    mx: 'auto',
    overflow: 'hidden',
  })
)

const { logoBigHeight, logoBigWidth, logoSmallHeight, logoSmallWidth } =
  LOGO_DIMENSIONS

const LogoBox = styled(motion.div)(
  {
    svg: {
      display: 'block',
      width: '100%',
      height: '100%',
    },
    flexShrink: 0,
    display: 'flex',
  },
  variant({
    variants: {
      big: {
        maxWidth: logoBigWidth,
        maxHeight: logoBigHeight,
      },
      small: {
        maxWidth: logoSmallWidth,
        maxHeight: logoSmallHeight,
      },
      sticky: {
        maxWidth: logoSmallWidth,
        maxHeight: logoSmallHeight,
      },
    },
  })
)

const LogoContainer = styled('div')(
  {
    'div:first-of-type': {
      paddingRight: '5px',
    },
    'div:last-of-type': {
      paddingLeft: '5px',
    },
    width: '356px',
  },
  css({
    display: 'flex',
  }),
  variant({
    variants: {
      big: {
        height: logoBigHeight,
      },
      small: {
        height: logoSmallHeight,
      },
      sticky: {
        height: logoSmallHeight,
        position: 'fixed',
      },
    },
  })
)

const SecondaryLogoBox = styled('div')(
  css({
    width: '100%',
    height: '100%',
  })
)

const SecondaryLogo = styled('img')(
  css({
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'right',
  })
)
