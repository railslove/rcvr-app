import * as React from 'react'
import { Flex, Box } from '@ui/base'

type CircleProps = {
  size?: number | string
  color?: string
  children?: React.ReactNode
  far?: boolean
}

const Circle: React.FC<CircleProps> = ({ color, size = 6, children, far }) => {
  return (
    <Flex position="relative" size={size}>
      <Flex
        position="relative"
        zIndex={2}
        size="100%"
        borderRadius="50%"
        border="circle"
        align="center"
        justify="center"
      >
        {children}
      </Flex>
      {color && (
        <Box
          position="absolute"
          size="100%"
          bg={color}
          left={far ? '20%' : '11%'}
          top={far ? '14%' : '6%'}
          borderRadius="50%"
          zIndex={1}
        />
      )}
    </Flex>
  )
}

export default Circle
