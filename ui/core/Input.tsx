import * as React from 'react'
import { useField } from 'formik'

interface Props {
  name: string
  label: string
}
type InputProps = JSX.IntrinsicElements['input'] & Props

export const Input: React.FC<InputProps> = ({ label, ...rest }) => {
  const [field, meta] = useField(rest)

  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <input id={field.name} {...field} {...rest} />
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </div>
  )
}
