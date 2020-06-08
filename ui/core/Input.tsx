import * as React from 'react'
import { useField } from 'formik'
import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import TextareaAutosize from 'react-textarea-autosize'
import { useDropzone } from 'react-dropzone'

import { EyeOpen, EyeClosed, Trash } from '~ui/svg'
import { Text } from './Text'
import { Icon } from './Icon'
import type { As } from './'

interface Props {
  name: string
  label: string
  hint?: React.ReactNode
  multiline?: boolean
}
type InputProps = JSX.IntrinsicElements['input'] & Props

export const Input: React.FC<InputProps> = ({
  label,
  hint,
  multiline,
  ...rest
}) => {
  const [revealPassword, setRevealPassword] = React.useState(false)
  const [field, meta] = useField(rest)
  const showError = Boolean(meta.touched && meta.error)
  const type = revealPassword ? 'text' : rest.type

  const toggleRevealPassword = React.useCallback(() => {
    setRevealPassword((value) => !value)
  }, [])

  const additionalProps: any = {}
  if (multiline) {
    additionalProps.as = TextareaAutosize
    additionalProps.minRows = 3
  }

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
          {...additionalProps}
        />
        {rest.type === 'password' && (
          <OverlayButton
            onClick={toggleRevealPassword}
            type="button"
            tabIndex={-1}
          >
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

export const FileInput: React.FC<InputProps> = ({ label, hint, ...rest }) => {
  const [{ onChange: _, value, ...field }, meta, helpers] = useField(rest)
  const [error, setError] = React.useState<string>()
  const showError = Boolean(meta.touched && error)

  const onDrop = React.useCallback(
    (acceptedFiles, rejectedFiles) => {
      helpers.setTouched(true)
      setError(undefined)

      if (acceptedFiles.length > 0) {
        helpers.setValue(acceptedFiles[0])
      }

      if (rejectedFiles.length > 0) {
        helpers.setTouched(true)
        setError('Es können nur pdf-Dateien hochgeladen werden.')
      }
    },
    [helpers]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'application/pdf',
  })

  const resetValue = React.useCallback(
    (event) => {
      event.stopPropagation()
      helpers.setTouched(true)
      helpers.setValue(undefined)
      setError(undefined)
    },
    [helpers]
  )

  return (
    <div>
      <InputContainer>
        <InputElement as="div" css={{ paddingRight: 40 }} {...getRootProps()}>
          <input type="file" {...field} {...rest} {...getInputProps()} />
          <Text
            as="label"
            variant="label"
            htmlFor={field.name}
            className={!!value && 'active'}
          >
            {label}
          </Text>
          <Text>
            {typeof value === 'string' ? value : value?.name}
            &nbsp;
          </Text>
          <OverlayButton onClick={resetValue} type="button" tabIndex={-1}>
            <Icon icon={Trash} size={5} />
          </OverlayButton>
        </InputElement>
        <Underline asError={showError} />
      </InputContainer>
      {showError && <ErrorText variant="fineprint">{error}</ErrorText>}
      {!showError && hint && <HintText variant="fineprint">{hint}</HintText>}
    </div>
  )
}

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
    bg: props.asError ? 'red.400' : 'pink',
    transform: props.asError ? 'scale(1)' : 'scale(0)',
    transformOrigin: 'bottom center',
    transition: 'all 170ms',

    'input:focus ~ &, textarea:focus ~ &': {
      transform: 'scale(1)',
    },
  })
)

const InputElement: React.FC<React.HTMLAttributes<any> & As> = styled('input')(
  css({
    display: 'block',
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
      top: 5,
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

    'input:focus ~ label, textarea:focus ~ label': {
      transform: 'scale(0.8) translateY(-26px)',
      color: 'pink',
    },
  })
)
