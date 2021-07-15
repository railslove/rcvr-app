import * as React from 'react'
import { useField } from 'formik'
import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import { motion } from 'framer-motion'
import { isRcvrEnv } from '~lib/config'

import { Check } from '~ui/anicons'
import { Text } from './Text'

interface Props {
  name: string
  hint?: string
  hintEnabled?: string
  label: string | React.ReactElement
  hideError?: boolean
}
type RadioProps = JSX.IntrinsicElements['input'] & Props

export const Radio: React.FC<RadioProps> = ({
  label,
  hint,
  hintEnabled,
  hideError,
  ...rest
}) => {
  const [field, meta] = useField({ ...rest, type: 'radio' })
  const showError = Boolean(meta.touched && meta.error)
  const fieldId = field.value.replace(/[^a-z0-9]/gi, '-')

  return (
    <div>
      <RadioboxContainer htmlFor={fieldId}>
        <div css={{ position: 'relative' }}>
          <FakeCheckbox />
          <CheckboxCircle
            initial={{ scale: 0 }}
            animate={{ scale: field.checked ? 1 : 0 }}
          />
          {field.checked && <Check />}
        </div>
        <Text variant="label">{label}</Text>
      </RadioboxContainer>
      <input
        id={fieldId}
        type="radio"
        checked={field.name == field.value}
        {...field}
        {...rest}
        css={{ display: 'none' }}
      />
      {field.checked && hintEnabled && (
        <HintText variant="fineprint">{hintEnabled}</HintText>
      )}
      {hint && !(field.checked && hintEnabled) && (
        <HintText variant="fineprint">{hint}</HintText>
      )}
      {!hideError && showError && (
        <ErrorText variant="fineprint">{meta.error}</ErrorText>
      )}
    </div>
  )
}

const RadioboxContainer = styled('label')(
  css({
    display: 'flex',
    pr: 3,
    pt: 4,
    pb: 3,

    svg: {
      width: '20px',
      right: '20px',
      position: 'absolute',
      zIndex: 2,
      top: '-5px',
      left: '4px',
    },
  })
)

const FakeCheckbox = styled('div')(
  css({
    zIndex: 2,
    position: 'relative',
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    width: '20px',
    height: '20px',
    borderRadius: 5,
    flexShrink: 0,
    mr: 2,
    mt: '-3px',
  })
)

const CheckboxCircle = styled(motion.div)(
  css({
    bg: 'green',
    width: '20px',
    height: '20px',
    borderRadius: 5,
    position: 'absolute',
    top: isRcvrEnv ? '0px' : '-3px',
    left: isRcvrEnv ? '4px' : '0px',
    zIndex: 1,
  })
)

const ErrorText = styled(Text)(
  css({
    color: 'red.400',
    py: 2,
    px: 3,
  })
)

const HintText = styled(Text)(
  css({
    color: 'bluegrey.500',
    px: 8,
  })
)
