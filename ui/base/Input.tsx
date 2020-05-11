import * as React from 'react'
import { Box, Flex, Text } from '@ui/base'
import { Eye, EyeCrossed } from '@ui/icons'
import { motion } from 'framer-motion'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  decorator?: React.ReactNode
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  decorator,
  value,
  ...rest
}) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false)
  const [ownValue, setOwnValue] = React.useState(value)
  const [focused, setFocused] = React.useState(false)
  const active = ownValue !== '' || focused
  const underline = focused || Boolean(error)

  function handleChange(event): void {
    setOwnValue(event.target.value)
    rest?.onChange(event)
  }

  return (
    <Box mb={4}>
      <Flex borderBottom="input" position="relative">
        <motion.div
          css={{
            position: 'absolute',
            top: 14,
            left: 10,
            pointerEvents: 'none',
          }}
          initial={{ y: 0 }}
          animate={{ y: active ? -20 : 0, scale: active ? 0.75 : 1 }}
          style={{ originX: 0 }}
        >
          <Text as="div" fontSize="s" fontWeight="semibold">
            {label}
          </Text>
        </motion.div>
        <input
          css={{
            background: 'transparent',
            padding: '16px 10px 12px',
            border: 0,
            flex: 1,
            fontWeight: 600,
            fontSize: 13,
            outline: 'none',
          }}
          {...rest}
          onChange={handleChange}
          onFocus={(): void => setFocused(true)}
          onBlur={(): void => setFocused(false)}
          type={
            rest.type === 'password' && passwordVisible ? 'text' : rest.type
          }
        />
        {rest.type === 'password' && (
          <Flex
            as="button"
            type="button"
            align="center"
            justify="center"
            flexShrink={0}
            onClick={(): void => setPasswordVisible((cur) => !cur)}
            css={{ ':focus': { outline: 'none' } }}
          >
            {passwordVisible ? <EyeCrossed /> : <Eye />}
          </Flex>
        )}
        <motion.div
          css={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: underline ? 1 : 0 }}
          style={{ originX: 0 }}
          transition={{ ease: 'easeOut', duration: 0.5 }}
        >
          <Box width="100%" bg={error ? 'red' : 'pink'} height="2px" />
        </motion.div>
      </Flex>
      {decorator}
      {error && error !== '' && (
        <Text as="div" color="red" fontSize="s" fontWeight="semibold" mt={1}>
          {error}
        </Text>
      )}
    </Box>
  )
}

export default Input
