import * as React from 'react'
import { Box, Text } from '@ui/base'
import { motion } from 'framer-motion'

type StrengthMeterProps = {
  strength: -1 | 0 | 1 | 2
}

const colors = ['#DADADA', '#EE283F', '#EDC33B', '#28EE5F']
const textColors = ['black', '#EE283F', '#CFA614', 'black']
const scales = [0, 0.333, 0.666, 1]

const StrengthMeter: React.FC<StrengthMeterProps> = ({ strength }) => {
  return (
    <Box mt={1}>
      <Box width="100%" bg="#DADADA" height="3px" position="relative">
        <motion.div
          css={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
          style={{
            originX: 0,
          }}
          initial={{
            backgroundColor: colors[strength + 1],
            scaleX: scales[strength + 1],
          }}
          animate={{
            backgroundColor: colors[strength + 1],
            scaleX: scales[strength + 1],
          }}
        />
      </Box>
      {strength > -1 && strength < 2 && (
        <Text fontSize="xxs" mt={2} color={textColors[strength + 1]}>
          <Text as="span" fontWeight="bold" color="inherit">
            Unsicheres Passwort.
          </Text>{' '}
          Verwenden Sie mindestens 8 Zeichen. Mindestens eine Zahl, ein
          Kleinbuchstabe, ein Großbuchstabe und ein Sonderzeichen.
        </Text>
      )}
    </Box>
  )
}

export default StrengthMeter
