import styled from '@emotion/styled'
import { Box } from '@ui/base'

const Text = styled(Box)({})

Text.defaultProps = {
  as: 'p',
  fontFamily: 'body',
  margin: 0,
  color: 'black',
  lineHeight: 1.4,
}

export default Text
