import * as React from 'react'
import { Box, BoxProps } from '@ui/base'

type ArrowProps = {
  color?: string
  left?: boolean
}

const Arrows: React.FC<BoxProps & ArrowProps> = ({
  left,
  color = 'bluegrey.500',
  ...rest
}) => {
  return (
    <Box
      as="svg"
      display="block"
      width="10px"
      height="10px"
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
      css={{
        transform: left && 'rotate(180deg)',
        transformOrigin: 'center center',
      }}
      color={color}
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.992507 0L0 0.992507L3.7146 4.70711L0 8.4217L0.992507 9.41421L5.69961 4.70711L0.992507 0ZM4.50154 0L3.50904 0.992507L7.22364 4.70711L3.50904 8.4217L4.50154 9.41421L9.20865 4.70711L4.50154 0Z"
        fill="currentColor"
      />
    </Box>
  )
}

export default Arrows
