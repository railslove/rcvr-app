import * as React from 'react'
import { Box, Text } from '@ui/base'
import { motion } from 'framer-motion'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

const Input: React.FC<InputProps> = ({ label, error, ...rest }) => {
  const [value, setValue] = React.useState('')
  const [focused, setFocused] = React.useState(false)
  const active = value !== '' || focused
  const underline = focused || Boolean(error)

  function handleChange(event): void {
    setValue(event.target.value)
    rest?.onChange(event)
  }

  return (
    <Box my={4}>
      <Box borderBottom="input" position="relative">
        <motion.div
          css={{ position: 'absolute', top: 14, left: 10 }}
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
            width: '100%',
            fontWeight: 600,
            fontSize: 13,
            outline: 'none',
          }}
          {...rest}
          onChange={handleChange}
          onFocus={(): void => setFocused(true)}
          onBlur={(): void => setFocused(false)}
        />
        <motion.div
          css={{ position: 'absolute', top: '100%', left: 0, right: 0 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: underline ? 1 : 0 }}
          style={{ originX: 0 }}
          transition={{ ease: 'easeOut', duration: 0.5 }}
        >
          <Box width="100%" bg={error ? 'red' : 'pink'} height="2px" />
        </motion.div>
      </Box>
      {error && (
        <Text as="div" color="red" fontSize="s" fontWeight="semibold" mt={1}>
          {error}
        </Text>
      )}
    </Box>
  )
}

export default Input
