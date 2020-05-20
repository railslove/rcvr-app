import * as React from 'react'
import { useField } from 'formik'

interface Props {
  name: string
  label: string
}
type CheckboxProps = JSX.IntrinsicElements['input'] & Props

export const Checkbox: React.FC<CheckboxProps> = ({ label, ...rest }) => {
  const [field, meta] = useField({ ...rest, type: 'checkbox' })

  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <input id={field.name} type="checkbox" {...field} {...rest} />
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </div>
  )
}
