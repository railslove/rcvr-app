import * as React from 'react'
import { Card, Input, Button } from '@ui/base'

type InputCardProps = {
  label: string
  id: string
  onSubmit: (value: string) => void
  value?: string
}

const InputCard: React.FC<InputCardProps> = ({
  label,
  id,
  onSubmit,
  value: initialValue,
}) => {
  const [value, setValue] = React.useState(initialValue || '')
  const handleChange = React.useCallback((event) => {
    setValue(event.target.value)
  }, [])

  const handleSubmit = React.useCallback(() => {
    onSubmit(value)
    setValue('')
  }, [value, onSubmit])

  return (
    <Card>
      <Input onChange={handleChange} label={label} value={value} id={id} />
      <Button title="Speichern" onClick={handleSubmit} />
    </Card>
  )
}

export default InputCard
