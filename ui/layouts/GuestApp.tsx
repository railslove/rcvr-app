import * as React from 'react'
import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import { variant } from 'styled-system'
import { motion } from 'framer-motion'
import { Box } from '@ui/core'
import Logo from '@ui/svg/logo.svg'

type GuestAppProps = {
  children: React.ReactNode
  logoVariant?: 'big' | 'small' | 'sticky'
}

export const GuestApp: React.FC<GuestAppProps> = ({
  children,
  logoVariant = 'small',
}) => {
  return (
    <Limit>
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
        width: '124px',
        height: '20px',
      },
      small: {
        width: '61px',
        height: '10px',
      },
      sticky: {
        top: 8,
        position: 'fixed',
        width: '61px',
        height: '10px',
      },
    },
  })
)
