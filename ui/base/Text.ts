import styled from '@emotion/styled'
import { Box } from '@ui/base'

const Text = styled(Box)({
  'a.link': {
    color: '#226EEC',
    textDecoration: 'underline',
  },
})

Text.defaultProps = {
  as: 'p',
  fontFamily: 'body',
  color: 'black',
  lineHeight: 1.4,
}

export default Text
