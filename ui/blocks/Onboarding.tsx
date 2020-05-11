import * as React from 'react'
import * as db from '@lib/db'
import { Box, Flex, Input, Button, Text, Checkbox } from '@ui/base'
import { Arrows } from '@ui/icons'
import Logo from '@ui/blocks/Logo'

type OnFinishOptions = {
  rememberMe: boolean
}
type OnboardingProps = {
  onFinish: (guest: db.Guest, options: OnFinishOptions) => void
}

const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [rememberMe, setRememberMe] = React.useState(false)
  const [nameError, setNameError] = React.useState(false)
  const [phoneError, setPhoneError] = React.useState(false)

  function handleSubmit(event): void {
    event.preventDefault()
    if (!name || !phone) {
      !name && setNameError(true)
      !phone && setPhoneError(true)
      return
    }
    onFinish({ name, phone }, { rememberMe })
  }

  const handleNameChange = React.useCallback((event) => {
    setNameError(false)
    setName(event.target.value)
  }, [])

  const handlePhoneChange = React.useCallback((event) => {
    setPhoneError(false)
    setPhone(event.target.value)
  }, [])

  const handleRememberMeChange = React.useCallback((event) => {
    setRememberMe(event.target.checked)
  }, [])

  return (
    <Flex
      width="255px"
      mx="auto"
      flexDirection="column"
      align="center"
      justify="center"
      flex={1}
    >
      <Box mb={6}>
        <Logo width="124px" height="20px" />
      </Box>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Name"
          value={name}
          onChange={handleNameChange}
          error={nameError && 'Name muss ausgefüllt werden.'}
        />
        <Input
          type="tel"
          label="Telefon"
          value={phone}
          onChange={handlePhoneChange}
          error={phoneError && 'Telefonnummer muss ausgefüllt werden.'}
        />
        <Checkbox
          checked={rememberMe}
          onChange={handleRememberMeChange}
          label="Daten auf meinem Handy speichern"
          name="rememberMe"
        />
        <Box mt={6}>
          <Button
            type="submit"
            title="Check in"
            animateIn
            left={<Arrows color="green" size="16px" />}
            right={<Arrows color="green" left size="16px" />}
          />
        </Box>
        <Text fontSize="xs" mt={3}>
          Mit dem betätigen des Buttons erkläre ich mich mit den{' '}
          <a className="link" href="https://railslove.com/privacy/">
            Datenschutzbestimmungen
          </a>{' '}
          einverstanden.
        </Text>
      </form>
    </Flex>
  )
}

export default Onboarding
