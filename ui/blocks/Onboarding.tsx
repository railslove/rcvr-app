import * as React from 'react'
import * as db from '@lib/db'
import { Box, Flex, Input, Button, Text, Checkbox } from '@ui/base'
import { Arrows } from '@ui/icons'
import Logo from '@ui/blocks/Logo'

type OnFinishOptions = {
  rememberMe: boolean
}
type OnboardingProps = {
  onFinish: (guest: db.GuestChangeset, options: OnFinishOptions) => void
}

const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [rememberMe, setRememberMe] = React.useState(false)
  const [nameError, setNameError] = React.useState(false)
  const [phoneError, setPhoneError] = React.useState(false)
  const [addressError, setAddressError] = React.useState(false)

  function handleSubmit(event): void {
    event.preventDefault()
    if (!name || !phone || !address) {
      !name && setNameError(true)
      !phone && setPhoneError(true)
      !address && setAddressError(true)
      return
    }
    onFinish({ name, phone, address }, { rememberMe })
  }

  const handleNameChange = React.useCallback((event) => {
    setNameError(false)
    setName(event.target.value)
  }, [])

  const handlePhoneChange = React.useCallback((event) => {
    setPhoneError(false)
    setPhone(event.target.value)
  }, [])

  const handleAddressChange = React.useCallback((event) => {
    setAddressError(false)
    setAddress(event.target.value)
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
          id="name"
          type="text"
          label="Name"
          value={name}
          onChange={handleNameChange}
          error={nameError && 'Name muss ausgefüllt werden.'}
          autoComplete="name"
        />
        <Input
          id="phone"
          type="tel"
          label="Telefon"
          value={phone}
          onChange={handlePhoneChange}
          error={phoneError && 'Telefonnummer muss ausgefüllt werden.'}
          autoComplete="tel"
        />
        <Input
          id="address"
          type="text"
          label="Anschrift"
          value={address}
          onChange={handleAddressChange}
          error={addressError && 'Anschrift muss ausgefüllt werden.'}
          autoComplete="street-address"
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
          Mit dem betätigen des Buttons erkläre ich mich einverstanden, dass
          meine Daten zur Erfüllung der Verpflichtung der Hygiene- und
          Infektionsschutzstandards für 4 Wochen gespeichert werden.
        </Text>
      </form>
    </Flex>
  )
}

export default Onboarding
