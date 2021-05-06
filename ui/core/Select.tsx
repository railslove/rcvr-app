import * as React from 'react'
import { useField } from 'formik'
import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import { Text } from './Text'

interface Props {
  name: string
  label: string
  options: {
    [key: string]: string
  }
}
type InputProps = JSX.IntrinsicElements['input'] & Props

export const Select: React.FC<InputProps> = ({ label, options, ...rest }) => {
  const [field, _meta] = useField(rest)
  return (
    <SelectContainer>
      <Text as="label" variant="label" htmlFor={field.name}>
        {label}
      </Text>
      <select name={field.name} {...field}>
        {Object.keys(options).map((key) => (
          <option key={key} value={key}>
            {options[key]}
          </option>
        ))}
      </select>
    </SelectContainer>
  )
}

const SelectContainer = styled('div')(
  css({
    label: {
      display: 'block',
      marginLeft: 3,
      marginBottom: 1,
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
