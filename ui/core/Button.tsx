import * as React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import { As } from './'

interface Props {
  children: React.ReactNode
  left?: React.ReactNode
  right?: React.ReactNode
  dataAttributes?: {
    [id: string]: string
  }
}
type ButtonProps = JSX.IntrinsicElements['button'] & Props & As

export const Button: React.FC<ButtonProps> = React.forwardRef(
  ({ children, left, right, dataAttributes, ...rest }, ref) => {
    const data = Object.entries(dataAttributes || {}).reduce(
      (data, [key, value]) => ({ [`data-${key}`]: value, ...data }),
      {}
    )

    return (
      <Base {...rest} ref={ref} {...data}>
        {(left || right) && <Left>{left}</Left>}
        <Center>{children}</Center>
        {(left || right) && <Right>{right}</Right>}
      </Base>
    )
  }
)

Button.displayName = 'Button'

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
    bg: 'white',

    '&:hover': {
      transform: 'scale(1.02)',
      bg: 'bluegrey.50',
      boxShadow:
        '0px 4px 6px -1px rgba(0,0,0,0.1) , 0px 2px 4px -1px rgba(0,0,0,0.06)',
    },

    '&:focus': {
      transform: 'scale(1)',
      boxShadow:
        '0px 1px 3px 0px rgba(0,0,0,0.1) , 0px 1px 2px 0px rgba(0,0,0,0.06) ',
    },
  })
)

const Left = styled('div')(
  css({
    flex: '0 1 auto',
    width: 10,
    pl: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })
)

const Right = styled('div')(
  css({
    flex: '0 1 auto',
    width: 10,
    pr: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })
)

const Center = styled('div')(
  css({
    position: 'relative',
    flex: '0 1 auto',
    px: 4,
    py: 3,
    top: '1px',
  })
)

type ButtonLinkProps = ButtonProps & { href: string }

export const ButtonLink: React.FC<ButtonLinkProps> = ({ href, ...rest }) => {
  return (
    <Link href={href}>
      <a>
        <Button as="div" {...rest} />
      </a>
    </Link>
  )
}
