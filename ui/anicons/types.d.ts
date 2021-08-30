import { Interpolation, Theme } from '@emotion/react'

export type SVGIconProps = React.SVGProps<SVGSVGElement> &
  Partial<{
    css: Interpolation<Theme>
    size: string
    color: string
    variant: 'left' | 'up' | 'right' | 'down'
  }>
