import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import type { SpaceProps } from 'styled-system'
import { space, variant } from 'styled-system'
import { As } from './'

interface Props {
  variant?: 'info' | 'danger' | 'warn' | 'cyan' | 'lilac'
}
type StyledSystemProps = SpaceProps
type CalloutHTMLProps = React.HTMLAttributes<any>
type CalloutProps = CalloutHTMLProps & StyledSystemProps & As & Props

export const Callout: React.FC<CalloutProps> = styled('div')(
  css({
    p: 3,
    border: '1px solid',
    fontSize: 'sm',
    lineHeight: 1.4,
    borderRadius: 3,
  }),
  variant({
    variants: {
      info: {
        bg: 'blue.100',
        borderColor: 'blue.200',
        color: 'blue.500',
      },
      danger: {
        bg: 'red.100',
        borderColor: 'red.400',
        color: 'red.600',
      },
      warn: {
        bg: 'yellow.100',
        borderColor: 'yellow.400',
        color: 'yellow.700',
      },

      cyan: {
        bg: 'cyan.100',
        borderColor: 'cyan.600',
      },

      lilac: {
        bg: 'lilac.100',
        borderColor: 'lilac.600',
      },
    },
  }),
  space
)

Callout.defaultProps = {
  variant: 'info',
}
