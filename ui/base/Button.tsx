import * as React from 'react'
import { Flex, Text, Box } from '@ui/base'
import { motion } from 'framer-motion'

type ButtonProps = {
  title: string
  left?: React.ReactNode
  right?: React.ReactNode
  animateIn?: boolean
  animateOut?: boolean
  as?: React.ElementType
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  left,
  right,
  animateIn,
  animateOut,
  ...rest
}) => {
  const animate = animateIn || animateOut

  return (
    <Flex
      as="button"
      border="circle"
      borderRadius="l"
      onClick={onClick}
      height={5}
      width="100%"
      align="center"
      justify="center"
      opacity={rest.disabled ? '0.5' : 1}
      {...rest}
    >
      {left && (
        <motion.div
          animate={
            animate && { x: animateIn ? 10 : -10, opacity: [0, 0.5, 1, 0.5, 0] }
          }
          initial={animate && { x: 0, opacity: 0 }}
          transition={{
            loop: Infinity,
            duration: 1.5,
            repeatDelay: 0.1,
            ease: 'linear',
          }}
        >
          <Box mr={3}>{left}</Box>
        </motion.div>
      )}
      <Text
        as="span"
        fontSize="s"
        fontWeight="black"
        textTransform="uppercase"
        css={{ textTransform: 'uppercase' }}
        lineHeight={1}
        pt="4px"
      >
        {title}
      </Text>
      {right && (
        <motion.div
          animate={
            animate && { x: animateIn ? -10 : 10, opacity: [0, 0.5, 1, 0.5, 0] }
          }
          initial={animate && { x: 0, opacity: 0 }}
          transition={{
            loop: Infinity,
            duration: 1.5,
            repeatDelay: 0.1,
            ease: 'linear',
          }}
        >
          <Box ml={3}>{right}</Box>
        </motion.div>
      )}
    </Flex>
  )
}

export default Button
