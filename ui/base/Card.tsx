import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import { Box } from '@ui/base'

const Card = styled(Box)(
  css({
    position: 'relative',
    borderRadius: 'l',
    bg: 'white',
    p: 4,
    border: 'card',
  })
)

export default Card
