import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import type { LayoutProps } from 'styled-system'
import { layout } from 'styled-system'

type DividerHTMLProps = React.HTMLAttributes<any>
type StyledSystemProps = LayoutProps
type DividerProps = DividerHTMLProps & StyledSystemProps

export const Divider: React.FC<DividerProps> = styled('div')(
  layout,
  css({
    width: '100%',
    height: 'px',
    bg: 'bluegrey.100',
    my: 6,
  })
)
