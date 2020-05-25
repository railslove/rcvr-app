import * as React from 'react'
import styled from '@emotion/styled'
import shouldForwardProp from '@styled-system/should-forward-prop'
import type { LayoutProps, ColorProps } from 'styled-system'
import { layout, color, compose } from 'styled-system'
import { As } from './'

type IconHTMLProps = React.HTMLAttributes<any>
type StyledSystemProps = LayoutProps & ColorProps
type IconProps = IconHTMLProps & StyledSystemProps & As
type Props = { icon: React.FC }

export const Icon: React.FC<IconProps & Props> = ({
  icon: IconCmp,
  ...rest
}) => {
  return (
    <IconBase {...rest}>
      <IconCmp />
    </IconBase>
  )
}

const IconBase: React.FC<IconProps> = styled('div', { shouldForwardProp })(
  {
    svg: {
      display: 'block',
      width: '100%',
      height: '100%',
    },
  },
  compose(layout, color)
)
