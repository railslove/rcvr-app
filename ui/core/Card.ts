import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import type { SpaceProps } from 'styled-system'
import { space, variant } from 'styled-system'
import { As } from './'

interface Props {
  variant?: 'form'
}
type StyledSystemProps = SpaceProps
type CardHTMLProps = React.HTMLAttributes<any>
type CardProps = CardHTMLProps & StyledSystemProps & As & Props

export const Card: React.FC<CardProps> = styled('div')(
  css({
    position: 'relative',
    bg: 'white',
    borderColor: 'bluegrey.300',
    boxShadow:
      '0px 1px 3px 0px rgba(0,0,0,0.1) , 0px 1px 2px 0px rgba(0,0,0,0.06)',
  }),
  variant({
    variants: {
      form: {
        px: 8,
        py: 12,
      },
    },
  }),
  space
)
