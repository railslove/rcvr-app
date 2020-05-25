import * as React from 'react'
import { motion } from 'framer-motion'

interface Props {
  animated?: boolean
  delay?: number
}

type QuestionProps = JSX.IntrinsicElements['svg'] & Props

export const Question: React.FC<QuestionProps> = ({
  animated = true,
  delay = 0,
  ...rest
}) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <motion.path
        d="M19.1,25.6l0-4.4c6.1,0,9.4-2.7,9.4-9.1c0-4-2.6-9.2-9.2-9.2c-6,0-9.7,3.7-9.7,9.2"
        stroke="black"
        strokeWidth="4"
        animate={{ pathLength: 1, strokeLinecap: 'round' }}
        initial={{ pathLength: animated ? 0 : 1, strokeLinecap: 'butt' }}
        transition={{ duration: 0.4, delay: delay + 0.3 }}
      />
      <motion.line
        x1="19.1"
        y1="31.4"
        x2="19.1"
        y2="33"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
        animate={{ scale: 1 }}
        initial={{ scale: animated ? 0 : 1 }}
        transition={{ duration: 0.1, delay }}
      />
    </svg>
  )
}
