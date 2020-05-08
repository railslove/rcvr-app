import styled from '@emotion/styled'
import shouldForwardProp from '@styled-system/should-forward-prop'
import {
  space,
  color,
  background,
  layout,
  flexbox,
  typography,
  position,
} from 'styled-system'

const Box = styled('div', { shouldForwardProp })(
  {
    minWidth: 0,
  },
  space,
  color,
  background,
  layout,
  flexbox,
  typography,
  position
)

export default Box
