import * as React from 'react'
import { Flex, Text, Box } from '@ui/base'

type ButtonProps = {
  title: string
  left?: React.ReactNode
  right?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  left,
  right,
  ...rest
}) => {
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
      {...rest}
    >
      {left && <Box mr={3}>{left}</Box>}
      <Text
        as="span"
        fontSize="s"
        fontWeight="black"
        textTransform="uppercase"
        css={{ textTransform: 'uppercase' }}
        lineHeight={1}
        pt="2px"
      >
        {title}
      </Text>
      {right && <Box ml={3}>{right}</Box>}
    </Flex>
  )
}

export default Button
