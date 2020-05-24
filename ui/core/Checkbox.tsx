import * as React from 'react'
import { useField } from 'formik'
import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import { motion } from 'framer-motion'
import { Text } from './Text'
import { Check } from '@ui/anicons/Check'

interface Props {
  name: string
  label: string
}
type CheckboxProps = JSX.IntrinsicElements['input'] & Props

export const Checkbox: React.FC<CheckboxProps> = ({ label, ...rest }) => {
  const [field, meta] = useField({ ...rest, type: 'checkbox' })
  const showError = Boolean(meta.touched && meta.error)

  return (
    <div>
      <CheckboxContainer htmlFor={field.name}>
        <div css={{ position: 'relative' }}>
          <FakeCheckbox />
          <CheckboxCircle
            initial={{ scale: 0 }}
            animate={{ scale: field.checked ? 1 : 0 }}
          />
          {field.checked && <Check />}
        </div>
        <Text variant="label">{label}</Text>
      </CheckboxContainer>
      <input
        id={field.name}
        type="checkbox"
        {...field}
        {...rest}
        css={{ display: 'none' }}
      />
      {showError && <ErrorText variant="fineprint">{meta.error}</ErrorText>}
    </div>
  )
}

const CheckboxContainer = styled('label')(
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
    top: '0px',
    left: '4px',
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
