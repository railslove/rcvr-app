import * as React from 'react'
import * as db from '@lib/db'

type OnboardingProps = {
  onFinish: (guest: db.Guest) => void
}

const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')

  function handleSubmit(event): void {
    event.preventDefault()
    onFinish({ name, phone })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e): void => setName(e.target.value)}
      />
      <input
        type="tel"
        value={phone}
        onChange={(e): void => setPhone(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default Onboarding
