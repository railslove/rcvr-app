import * as React from 'react'
import { motion } from 'framer-motion'
import { Box, BoxProps } from '@ui/base'

type CheckProps = {
  animated?: boolean
  delay?: number
} & BoxProps &
  React.SVGAttributes<{}>

const Check: React.FC<CheckProps> = ({ animated, delay = 0, ...rest }) => {
  return (
    <Box
      as="svg"
      width="27px"
      height="18px"
      viewBox="0 0 27 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <motion.path
        d="M2 7.5L10 16L24.5 2"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ pathLength: 1 }}
        initial={{ pathLength: animated ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.9, 0.79, 0.53, -0.31], delay }}
      />
    </Box>
  )
}

export default Check
