import * as React from 'react'
import { Flex, Circle } from '@ui/base'
import { motion } from 'framer-motion'

type LoadingProps = {}

const Loading: React.FC<LoadingProps> = () => {
  const css = { marginLeft: 5, marginRight: 5 }
  const transition = {
    ease: 'easeInOut',
    yoyo: Infinity,
    duration: 0.6,
    repeatDelay: 0.1,
  }

  return (
    <Flex>
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ y: -80 }}
          initial={{ y: 0 }}
          transition={{ ...transition, delay: i * 0.1 }}
          css={css}
        >
          <Circle size="22px" color="green" far />
        </motion.div>
      ))}
    </Flex>
  )
}

export default Loading
