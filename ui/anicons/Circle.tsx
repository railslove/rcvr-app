import * as React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { css } from '@styled-system/css'

interface Props {
  animated?: boolean
  color?: string
  delay?: number
  children?: React.ReactNode
  size?: number
}

export const Circle: React.FC<Props> = ({
  animated = false,
  color = 'green',
  delay = 0,
  size = 64,
  children,
}) => {
  return (
    <Container css={{ width: size, height: size }}>
      <motion.div
        animate={animated && { scale: 1 }}
        initial={animated && { scale: 0 }}
        transition={{ delay }}
        css={css({
          position: 'absolute',
          top: size < 40 ? '1px' : '3px',
          left: size < 40 ? '4px' : '7px',
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          bg: color,
          zIndex: 1,
        })}
      />
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        css={{ position: 'absolute', zIndex: 2, overflow: 'visible' }}
      >
        <motion.path
          animate={animated ? { pathLength: 1 } : {}}
          initial={animated ? { pathLength: 0 } : {}}
          transition={{ delay }}
          d="M40.3 2.3C52.9 6.1 62 17.7 62 31.5 62 48.4 48.3 62 31.5 62S1 48.4 1 31.5 14.7 1 31.5 1c3.1 0 6 .4 8.8 1.3"
          fill="none"
          stroke="#000"
          strokeWidth={size < 40 ? 3 : 2}
        />
      </svg>
      <div css={{ position: 'relative', zIndex: 3 }}>{children}</div>
    </Container>
  )
}

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'visible',

  svg: {
    display: 'block',
  },
})
