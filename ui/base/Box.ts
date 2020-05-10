import styled from '@emotion/styled'
import shouldForwardProp from '@styled-system/should-forward-prop'
import * as ssystem from 'styled-system'

export type BoxProps =
  | ssystem.SpaceProps
  | ssystem.BackgroundProps
  | ssystem.BackgroundColorProps
  | ssystem.LayoutProps
  | ssystem.FlexboxProps
  | ssystem.TypographyProps
  | ssystem.PositionProps
  | ssystem.BorderProps

const Box = styled('div', { shouldForwardProp })(
  {
    minWidth: 0,
  },
  ssystem.space,
  ssystem.color,
  ssystem.background,
  ssystem.layout,
  ssystem.flexbox,
  ssystem.typography,
  ssystem.position,
  ssystem.border
)

export default Box
