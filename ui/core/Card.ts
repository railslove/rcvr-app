import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import type { SpaceProps } from 'styled-system'
import { space } from 'styled-system'
import { As } from './'

type StyledSystemProps = SpaceProps
type CardHTMLProps = React.HTMLAttributes<any>
type CardProps = CardHTMLProps & StyledSystemProps & As

export const Card: React.FC<CardProps> = styled('div')(
  space,
  css({
    bg: 'white',
    px: 8,
    py: 12,
    borderColor: 'bluegrey.300',
    boxShadow:
      '0px 1px 3px 0px rgba(0,0,0,0.1) , 0px 1px 2px 0px rgba(0,0,0,0.06)',
  })
)
