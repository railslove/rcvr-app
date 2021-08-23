import React from 'react'
import { SVGIconProps } from '~ui/anicons/types'

export const RoundTriangle: React.FC<SVGIconProps> = ({
  size = 14,
  color = '#B7B7B7',
  variant = 'down',
  ...rest
}) => {
  return (
    <svg
      fill="none"
      width={size}
      height={size}
      {...rest}
      viewBox="0 0 14 13"
      transform={
        (variant === 'up' && 'rotate(180)') ||
        (variant === 'left' && 'rotate(90)') ||
        (variant === 'right' && 'rotate(-90)') ||
        undefined
      }
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.82617 3.63903L9.89978 3.63903C10.6302 3.63903 11.1142 4.39667 10.8071 5.05942L7.73352 11.6934C7.37546 12.4662 6.27688 12.4662 5.91883 11.6934L2.84522 5.05942C2.53816 4.39667 3.02214 3.63903 3.75257 3.63903L6.82617 3.63903Z"
        fill={color}
      />
    </svg>
  )
}
