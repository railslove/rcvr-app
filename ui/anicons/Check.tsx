import * as React from 'react'
import { motion } from 'framer-motion'

interface CheckProps {
  animated?: boolean
  delay?: number
}

export const Check: React.FC<CheckProps> = ({ animated, delay = 0 }) => {
  return (
    <svg
      width="27"
      height="18"
      viewBox="0 0 27 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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
    </svg>
  )
}
