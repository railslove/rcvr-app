import styled from '@emotion/styled'
import shouldForwardProp from '@styled-system/should-forward-prop'
import { css } from '@styled-system/css'

export const CheckinCard = styled('div', { shouldForwardProp })(
  css({
    position: 'relative',
    bg: 'white',
    borderTopLeftRadius: '35px',
    borderTopRightRadius: '35px',
    px: 16,
    py: 4,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderStyle: 'solid',
    borderColor: 'bluegrey.100',
    flexShrink: 0,

    '&::after': {
      content: '""',
      position: 'absolute',
      top: '100%',
      left: '-1px',
      right: '-1px',
      height: '1000px',
      bg: 'white',
      borderWidth: 0,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderStyle: 'solid',
      borderColor: 'bluegrey.100',
    },
  })
)

export const CheckinCardContainer = styled('div')(
  css({
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
    mx: -8,
  })
)
