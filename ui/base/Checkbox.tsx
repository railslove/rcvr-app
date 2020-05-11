import * as React from 'react'
import { Flex, Box, Text } from '@ui/base'
import { Check } from '@ui/icons'
import { motion } from 'framer-motion'

type CheckboxProps = {
  checked: boolean
  onChange: (Event) => void
  label: string
  name: string
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  name,
}) => {
  return (
    <Flex align="center">
      {checked ? <CheckedCheckbox /> : <UncheckedCheckbox />}
      <Text
        as="label"
        htmlFor={name}
        fontSize="xs"
        fontWeight="bold"
        ml="-28px"
        pl={4}
        pt="2px"
      >
        {label}
      </Text>
      <input
        id={name}
        type="checkbox"
        onChange={onChange}
        css={{ display: 'none' }}
        checked={checked}
      />
    </Flex>
  )
}

const UncheckedCheckbox: React.FC<{}> = () => {
  return (
    <Box
      width="20px"
      height="20px"
      border="checkbox"
      borderRadius="5px"
      mr={2}
      css={{ pointerEvents: 'none' }}
    />
  )
}

const CheckedCheckbox: React.FC<{}> = () => {
  return (
    <Box
      width="20px"
      height="20px"
      position="relative"
      mr={2}
      css={{ pointerEvents: 'none' }}
    >
      <Box
        width="100%"
        height="100%"
        border="checkbox"
        borderRadius="5px"
        position="relative"
        zIndex="2"
      />
      <motion.div
        animate={{
          scale: 1,
        }}
        initial={{ scale: 0 }}
        css={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 4,
          left: 4,
          zIndex: 1,
        }}
      >
        <Box width="100%" height="100%" bg="green" borderRadius="5px" />
      </motion.div>
      <Check
        width="21px"
        height="21px"
        position="absolute"
        zIndex={3}
        animated
        top="-2px"
        left="4px"
      />
    </Box>
  )
}

export default Checkbox
