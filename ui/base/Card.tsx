import styled from '@emotion/styled'
import { variant } from 'styled-system'
import { css } from '@styled-system/css'
import { Box } from '@ui/base'

const Card = styled(Box)(
  css({
    position: 'relative',
    borderTopLeftRadius: 'xl',
    borderTopRightRadius: 'xl',
    bg: 'white',
    px: 4,
    pt: 3,
    pb: 3,
    border: 'card',
    borderBottom: 0,
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      height: '1000px',
      backgroundColor: 'white',
    },
  }),
  variant({
    variants: {
      overlap: {
        pb: 5,
        mb: -4,
      },
    },
  })
)

export default Card
