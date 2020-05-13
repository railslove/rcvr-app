import styled from '@emotion/styled'
import { variant } from 'styled-system'
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
  }),
  variant({
    variants: {
      danger: {
        bg: '#f6eae8',
        color: '#7a6363',
        border: '#e7d9d9',
      },
    },
  })
)

export default Callout
