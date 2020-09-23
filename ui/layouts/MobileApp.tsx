import * as React from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import { variant } from 'styled-system'
import { motion } from 'framer-motion'

import { isCareEnv } from '~lib/config'
import { Box } from '~ui/core'
import {
  Logo,
  logoBigWidth,
  logoBigHeight,
  logoSmallWidth,
  logoSmallHeight,
} from '~ui/whitelabels'
import { SharedMeta } from '~ui/blocks/SharedMeta'

interface Props {
  children: React.ReactNode
  logoVariant?: 'big' | 'small' | 'sticky'
}

export const MobileApp: React.FC<Props> = ({
  children,
  logoVariant = 'small',
}) => {
  return (
    <Limit>
      <Head>
        <title key="title">{isCareEnv ? 'recover care' : 'recover'}</title>
      </Head>
      <SharedMeta />
      <LogoBox variant={logoVariant} layoutId="appLogo">
        <Logo />
      </LogoBox>
      <Box height={logoVariant === 'sticky' ? 6 : 4} />
      {children}
    </Limit>
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

const LogoBox = styled(motion.div)(
  {
    svg: {
      display: 'block',
      width: '100%',
      height: '100%',
    },
  },
  variant({
    variants: {
      big: {
        width: logoBigWidth,
        height: logoBigHeight,
        maxWidth: '100%',
      },
      small: {
        width: logoSmallWidth,
        height: logoSmallHeight,
        maxWidth: '100%',
      },
      sticky: {
        top: 4,
        position: 'fixed',
        width: logoSmallWidth,
        height: logoSmallHeight,
      },
    },
  })
)
