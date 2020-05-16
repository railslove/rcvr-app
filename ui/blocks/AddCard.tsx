import * as React from 'react'
import { Card, Input, Button } from '@ui/base'

type AddCardProps = {
  label: string
  id: string
  onAdd: (value: string) => void
}

const AddCard: React.FC<AddCardProps> = ({ label, id, onAdd }) => {
  const [value, setValue] = React.useState('')
  const handleChange = React.useCallback((event) => {
    setValue(event.target.value)
  }, [])

  const handleSubmit = React.useCallback(() => {
    onAdd(value)
    setValue('')
  }, [value, onAdd])

  return (
    <Card>
      <Input onChange={handleChange} label={label} value={value} id={id} />
      <Button title="Hinzufügen" onClick={handleSubmit} />
    </Card>
  )
}

export default AddCard
