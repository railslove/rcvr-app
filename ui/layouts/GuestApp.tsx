import * as React from 'react'
import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import { Box } from '@ui/core'
import Logo from '@ui/svg/logo.svg'

type GuestAppProps = {
  children: React.ReactNode
}

export const GuestApp: React.FC<GuestAppProps> = ({ children }) => {
  return (
    <Limit>
      <Logo width={125} height={20} />
      <Box height={4} />
      {children}
    </Limit>
  )
}

const Limit = styled('div')(
  css({
    p: 8,
    width: '100%',
    maxWidth: '400px',
    mx: 'auto',
  })
)
