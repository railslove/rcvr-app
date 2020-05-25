import * as React from 'react'
import { motion } from 'framer-motion'

interface Props {
  animated?: boolean
  delay?: number
}

type CheckBox = JSX.IntrinsicElements['svg'] & Props

export const Check: React.FC<CheckBox> = ({
  animated = true,
  delay = 0,
  ...rest
}) => {
  return (
    <svg
      width="27"
      height="18"
      viewBox="0 0 27 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <motion.path
        d="M2 7.5L10 16L24.5 2"
        stroke="black"
        strokeWidth="4"
        strokeLinejoin="round"
        animate={{ pathLength: 1, strokeLinecap: 'round' }}
        initial={{ pathLength: animated ? 0 : 1, strokeLinecap: 'butt' }}
        transition={{ duration: 0.4, ease: [0.9, 0.79, 0.53, -0.31], delay }}
      />
    </svg>
  )
}
