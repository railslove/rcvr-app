import * as React from 'react'
import { Box, Flex } from '@ui/base'

type KeyViewerProps = {
  value: string
}

const KeyViewer: React.FC<KeyViewerProps> = ({ value }) => {
  return (
    <Flex wrap="wrap" fontSize="l" fontFamily="monospace" justify="center">
      {value.match(/.{1,2}/g).map((group, i) => (
        <Box
          key={i}
          px={3}
          pt={3}
          pb={4}
          flexShrink={0}
          border="1px solid rgba(0,0,0,0.1)"
          position="relative"
          bg="bluegrey.300"
        >
          {group}
          <Box
            position="absolute"
            fontSize="s"
            bottom="8px"
            left={0}
            right={0}
            textAlign="center"
            opacity="0.3"
            css={{ userSelect: 'none' }}
          >
            {i + 1}
          </Box>
        </Box>
      ))}
    </Flex>
  )
}

export default KeyViewer
