import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styled from '@emotion/styled'
import { css } from '@styled-system/css'

interface Props {
  show?: boolean
}

export const Loading: React.FC<Props> = ({ show }) => {
  const transition = {
    ease: 'easeInOut',
    yoyo: Infinity,
    duration: 0.6,
  }

  return (
    <AnimatePresence>
      {show && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: -40 }}
              initial={{ y: 40 }}
              transition={{ ...transition, delay: i * 0.15 }}
            >
              <Dot />
            </motion.div>
          ))}
        </Overlay>
      )}
    </AnimatePresence>
  )
}

const Overlay = styled(motion.div)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
})

const Dot = styled('div')(
  css({
    position: 'relative',
    ml: '6px',
    mr: '6px',
    width: '22px',
    height: '22px',

    '&::after': {
      content: '""',
      position: 'absolute',
      width: '22px',
      height: '22px',
      borderRadius: '11px',
      borderWidth: 2,
      borderColor: 'black',
      borderStyle: 'solid',
    },

    '&::before': {
      content: '""',
      position: 'absolute',
      width: '22px',
      height: '22px',
      left: '4px',
      top: '3px',
      borderRadius: '11px',
      bg: 'green',
    },
  })
)
