import styled from '@emotion/styled'
import shouldForwardProp from '@styled-system/should-forward-prop'
import type {
  SpaceProps,
  ColorProps,
  LayoutProps,
  FlexboxProps,
  PositionProps,
} from 'styled-system'
import { compose, space, color, layout, flexbox, position } from 'styled-system'
import type { As } from './'

type BoxHTMLProps = React.HTMLAttributes<any>
type StyledSystemProps = SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  PositionProps

type BoxProps = As & BoxHTMLProps & StyledSystemProps

export const Box: React.FC<BoxProps> = styled('div', { shouldForwardProp })(
  compose(space, color, layout, flexbox, position)
)
