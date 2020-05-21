import * as React from 'react'
import { useField } from 'formik'
import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import { Text } from './Text'

interface Props {
  name: string
  label: string
}
type InputProps = JSX.IntrinsicElements['input'] & Props

export const Input: React.FC<InputProps> = ({ label, ...rest }) => {
  const [field, meta] = useField(rest)
  const showError = Boolean(meta.touched && meta.error)

  return (
    <div>
      <InputContainer>
        <InputElement id={field.name} {...field} {...rest} />
        <Text
          as="label"
          variant="label"
          htmlFor={field.name}
          className={field.value !== '' && 'active'}
        >
          {label}
        </Text>
        <Underline asError={showError} />
      </InputContainer>
      {showError && <ErrorText variant="fineprint">{meta.error}</ErrorText>}
    </div>
  )
}

const ErrorText = styled(Text)(
  css({
    color: 'red',
    py: 2,
    px: 3,
  })
)

const Underline = styled('div')((props: { asError: boolean }) =>
  css({
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '2px',
    bg: props.asError ? 'red' : 'pink',
    transform: props.asError ? 'scale(1)' : 'scale(0)',
    transformOrigin: 'bottom center',
    transition: 'all 170ms',

    'input:focus ~ &': {
      transform: 'scale(1)',
    },
  })
)

const InputElement = styled('input')(
  css({
    width: '100%',
    border: 0,
    bg: 'rgba(0, 0, 0, 0)',
    borderBottom: '1px solid',
    borderColor: 'black',
    fontSize: 'sm',
    lineHeight: 1.4,
    fontWeight: 'semibold',
    transition: 'background 170ms',
    p: 3,
    pt: 5,

    '&:focus': {
      bg: 'rgba(0, 0, 0, 0.06)',
    },
  })
)

const InputContainer = styled('div')(
  css({
    position: 'relative',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: 'hidden',

    label: {
      position: 'absolute',
      left: 3,
      bottom: 3,
      pointerEvents: 'none',
      lineHeight: 1.4,
      transform: 'scale(1) translateY(0px)',
      transformOrigin: 'bottom left',
      transition: 'all 170ms',
      color: 'bluegrey.500',
    },

    'label.active': {
      transform: 'scale(0.8) translateY(-26px)',
    },

    'input:focus ~ label': {
      transform: 'scale(0.8) translateY(-26px)',
      color: 'pink',
    },
  })
)
