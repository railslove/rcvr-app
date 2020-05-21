import * as React from 'react'
import { css } from '@styled-system/css'
import { motion } from 'framer-motion'

interface Props {
  color?: string
}
type ArrowsHTMLAttributes = JSX.IntrinsicElements['svg']
type ArrowsProps = ArrowsHTMLAttributes & Props

export const ArrowsRight: React.FC<ArrowsProps> = ({ color, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28.4 16.4"
      width="28"
      height="16"
      css={css({ color })}
      fill="currentColor"
      {...rest}
    >
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 18, opacity: [0, 1, 0] }}
          transition={{
            duration: 3,
            loop: Infinity,
            ease: 'linear',
            delay: i,
          }}
          d="M1.7 0L0 1.7l6.5 6.5L0 14.6l1.7 1.8 8.2-8.2z"
        />
      ))}
    </svg>
  )
}

export const ArrowsLeft: React.FC<ArrowsProps> = ({ color, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28.4 16.4"
      width="28"
      height="16"
      css={css({ color })}
      fill="currentColor"
      {...rest}
    >
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: -18, opacity: [0, 1, 0] }}
          transition={{
            duration: 3,
            loop: Infinity,
            ease: 'linear',
            delay: i,
          }}
          d="M18.5 8.2l8.1 8.2 1.8-1.8-6.5-6.4 6.5-6.5L26.6 0z"
        />
      ))}
    </svg>
  )
}
