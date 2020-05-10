import * as React from 'react'
import { motion } from 'framer-motion'

type CheckProps = React.SVGAttributes<{}> & { animated?: boolean }

const Check: React.FC<CheckProps> = ({ animated, ...rest }) => {
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
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ pathLength: 1 }}
        initial={{ pathLength: animated ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      />
    </svg>
  )
}

export default Check
