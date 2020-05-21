import * as React from 'react'
import { useField } from 'formik'
import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import EyeOpen from '@ui/svg/eye-open.svg'
import EyeClosed from '@ui/svg/eye-closed.svg'
import { Text } from './Text'

interface Props {
  name: string
  label: string
  hint?: React.ReactNode
}
type InputProps = JSX.IntrinsicElements['input'] & Props

export const Input: React.FC<InputProps> = ({ label, hint, ...rest }) => {
  const [revealPassword, setRevealPassword] = React.useState(false)
  const [field, meta] = useField(rest)
  const showError = Boolean(meta.touched && meta.error)
  const type = revealPassword ? 'text' : rest.type

  const toggleRevealPassword = React.useCallback(() => {
    setRevealPassword((value) => !value)
  }, [])

  return (
    <div>
      <InputContainer>
        <InputElement
          id={field.name}
          {...field}
          {...rest}
          type={type || 'text'}
          css={
            rest.type === 'password' && {
              paddingRight: 40,
            }
          }
        />
        {rest.type === 'password' && (
          <OverlayButton onClick={toggleRevealPassword} type="button">
            {revealPassword ? <EyeClosed /> : <EyeOpen />}
          </OverlayButton>
        )}
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
      {!showError && hint && <HintText variant="fineprint">{hint}</HintText>}
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

const HintText = styled(Text)(
  css({
    color: 'bluegrey.500',
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

const OverlayButton = styled('button')(
  css({
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'bluegrey.700',
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
