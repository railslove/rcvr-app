import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import { Box } from '@ui/base'

const Callout = styled(Box)(
  css({
    bg: '#E8F1F6',
    color: '#7C909B',
    border: '1px solid #D9E6E7',
    borderRadius: '3px',
    p: 3,
    fontSize: 's',
    fontWeight: 'bold',
    lineHeight: 1.4,

    a: {
      color: 'currentColor',
      textDecoration: 'underline',
    },
  })
)

export default Callout
