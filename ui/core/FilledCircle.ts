import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import type { SpaceProps } from 'styled-system'
import { variant } from 'styled-system'
import { As } from './'

interface Props {
  variant?: 'cyan' | 'lilac'
}
type StyledSystemProps = SpaceProps
type CalloutHTMLProps = React.HTMLAttributes<any>
type CalloutProps = CalloutHTMLProps & StyledSystemProps & As & Props

export const FilledCircle: React.FC<CalloutProps> = styled('div')(
  css({
    display: 'inline-block',
    border: '1px solid',
    lineHeight: 1.4,
    borderRadius: '100%',
    width: 5,
    height: 5,
    marginLeft: 2,
    marginRight: 2,
  }),
  variant({
    variants: {
      cyan: {
        bg: 'cyan.100',
        borderColor: 'cyan.600',
      },

      lilac: {
        bg: 'lilac.100',
        borderColor: 'lilac.600',
      },
    },
  })
)

FilledCircle.defaultProps = {
  variant: 'cyan',
}
