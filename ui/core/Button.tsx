import * as React from 'react'
import styled from '@emotion/styled'
import { css } from '@styled-system/css'

interface Props {
  children: React.ReactNode
  left?: React.ReactNode
  right?: React.ReactNode
}
type ButtonProps = JSX.IntrinsicElements['button'] & Props

export const Button: React.FC<ButtonProps> = ({
  children,
  left,
  right,
  ...rest
}) => {
  return (
    <Base {...rest}>
      {(left || right) && <Left>{left}</Left>}
      <Center>{children}</Center>
      {(left || right) && <Right>{right}</Right>}
    </Base>
  )
}

const Base = styled('button')(
  css({
    display: 'flex',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'black',
    textTransform: 'uppercase',
    borderRadius: 16,
    fontSize: 'sm',
    lineHeight: 1.4,
    fontWeight: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'scale(1)',
    transition: 'all 130ms',
    bg: 'transparent',

    '&:hover': {
      bg: 'bluegrey.50',
      boxShadow:
        '0px 4px 6px -1px rgba(0,0,0,0.1) , 0px 2px 4px -1px rgba(0,0,0,0.06)',
    },

    '&:focus': {
      transform: 'scale(1.02)',
      boxShadow:
        '0px 1px 3px 0px rgba(0,0,0,0.1) , 0px 1px 2px 0px rgba(0,0,0,0.06) ',
    },
  })
)

const Left = styled('div')(
  css({
    flex: '0 0 auto',
    width: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })
)

const Right = styled('div')(
  css({
    flex: '0 0 auto',
    width: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })
)

const Center = styled('div')(
  css({
    position: 'relative',
    flex: '0 0 auto',
    px: 4,
    py: 3,
    top: '1px',
  })
)
