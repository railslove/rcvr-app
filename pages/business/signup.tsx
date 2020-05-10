import * as React from 'react'
import checkStrength from 'check-password-strength'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'

import * as api from '@lib/api'
import * as db from '@lib/db'
import AppLayout from '@ui/layouts/App'
import { Box, Flex, Input, Button, Text } from '@ui/base'
import StrengthMeter from '@ui/blocks/StrengthMeter'
import Loading from '@ui/blocks/Loading'
import { Arrows } from '@ui/icons'
import Logo from '@ui/blocks/Logo'

type errorState = string | undefined
type strengthState = -1 | 0 | 1 | 2

const SignupPage: React.FC<{}> = () => {
  const router = useRouter()
  const { owner } = db.useOwner({ redirect: false })
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [strength, setStrength] = React.useState<strengthState>(-1)
  const [passwordVerify, setPasswordVerify] = React.useState('')
  const [nameError, setNameError] = React.useState<errorState>()
  const [emailError, setEmailError] = React.useState<errorState>()
  const [passwordError, setPasswordError] = React.useState<errorState>()
  const [passwordVerifyError, setPasswordVerifyError] = React.useState<
    errorState
  >()

  React.useEffect(() => {
    if (owner) router.replace('/business/dashboard')
  }, [owner, router])

  const [signup, { status, error }] = useMutation(api.createOwner, {
    throwOnError: true,
  })

  async function handleSubmit(event): Promise<void> {
    event.preventDefault()
    let valid = true

    if (!name) {
      valid = false
      setNameError('Name muss ausgefüllt werden.')
    }

    if (!email) {
      valid = false
      setEmailError('Email muss ausgefüllt werden.')
    }

    if (strength < 2) {
      valid = false
      setPasswordError('Passwort muss sicherer sein.')
    }

    if (!password) {
      valid = false
      setStrength
      setPasswordError('Passwort muss ausgefüllt werden.')
    }

    if (!passwordVerify) {
      valid = false
      setPasswordVerifyError('Passwort muss ausgefüllt werden.')
    }

    if (password !== passwordVerify) {
      valid = false
      setPasswordVerifyError('Passwörter müssen übereinstimmen.')
    }

    if (!valid) return

    await signup({ email, name, password })
    router.replace('/business/setup/intro')
  }

  const handleNameChange = React.useCallback((event) => {
    setNameError(undefined)
    setName(event.target.value)
  }, [])

  const handleEmailChange = React.useCallback((event) => {
    setEmailError(undefined)
    setEmail(event.target.value)
  }, [])

  const handlePasswordChange = React.useCallback((event) => {
    setPasswordError(undefined)
    setPasswordVerifyError(undefined)
    setStrength(
      event.target.value === '' ? -1 : checkStrength(event.target.value).id
    )
    setPassword(event.target.value)
  }, [])

  const handlePasswordVerifyChange = React.useCallback((event) => {
    setPasswordVerifyError(undefined)
    setPasswordVerify(event.target.value)
  }, [])

  if (status === 'loading') {
    return (
      <AppLayout withHeader={false} withTabs={false}>
        <Flex flex={1} align="center" justify="center">
          <Loading />
        </Flex>
      </AppLayout>
    )
  }

  if (status === 'error') {
    return (
      <AppLayout withHeader={false} withTabs={false}>
        {error.toString()}
      </AppLayout>
    )
  }

  return (
    <AppLayout withHeader={false} withTabs={false}>
      <Flex
        width="255px"
        mx="auto"
        flexDirection="column"
        align="center"
        justify="center"
        flex={1}
        py={6}
      >
        <Box mb={5}>
          <Logo width="124px" height="20px" />
        </Box>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Name"
            value={name}
            onChange={handleNameChange}
            error={nameError}
          />
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
          />
          <Input
            type="password"
            label="Passwort"
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
            decorator={<StrengthMeter strength={strength} />}
          />
          <Input
            type="password"
            label="Passwort wiederholen"
            value={passwordVerify}
            onChange={handlePasswordVerifyChange}
            error={passwordVerifyError}
          />
          <Box mt={5}>
            <Button
              type="submit"
              title="Registrieren"
              right={<Arrows color="green" size="16px" />}
            />
          </Box>
          <Text fontSize="xs" mt={3}>
            Mit dem betätigen des Buttons erkläre ich mich mit den
            Datenschutzbestimmungen einverstanden.
          </Text>
        </form>
      </Flex>
    </AppLayout>
  )
}

export default SignupPage
