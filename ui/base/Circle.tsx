import * as React from 'react'
import { Flex, Box } from '@ui/base'
import { motion } from 'framer-motion'

type CircleProps = {
  size?: number | string
  color?: string
  children?: React.ReactNode
  far?: boolean
  animated?: boolean
  delay?: number
}

const Circle: React.FC<CircleProps> = ({
  color,
  size = 6,
  children,
  far,
  animated,
  delay = 0,
}) => {
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
        <motion.div
          css={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: far ? '20%' : '11%',
            top: far ? '14%' : '6%',
            zIndex: 1,
          }}
          animate={{ scale: 1 }}
          initial={{ scale: animated ? 0 : 1 }}
          transition={{ delay }}
        >
          <Box position="absolute" size="100%" bg={color} borderRadius="50%" />
        </motion.div>
      )}
    </Flex>
  )
}

export default Circle
