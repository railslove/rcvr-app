import { Text } from './Text'

import styled from '@emotion/styled'
import { css } from '@styled-system/css'

export const ErrorText = styled(Text)(
  css({
    color: 'red.400',
    py: 2,
    px: 3,
  })
)
