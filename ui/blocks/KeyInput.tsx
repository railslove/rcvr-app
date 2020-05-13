import * as React from 'react'
import { Flex } from '@ui/base'
import TextareaAutosize from 'react-textarea-autosize'

type KeyInputProps = {
  onChange?: (key: string) => void
}

const KeyInput: React.FC<KeyInputProps> = ({ onChange }) => {
  const [value, setValue] = React.useState('')

  function handleChange(event): void {
    const currentValue = event.target.value.toUpperCase()
    setValue(currentValue)
    onChange && onChange(currentValue)
  }

  return (
    <Flex
      overflow="scroll"
      bg="bluegrey.300"
      fontSize="xl"
      fontFamily="monospace"
      px={3}
      py={3}
    >
      <TextareaAutosize
        minRows={3}
        value={value}
        css={{ border: 0, background: 'transparent' }}
        placeholder="01..."
        onChange={handleChange}
      />
    </Flex>
  )
}

export default KeyInput
