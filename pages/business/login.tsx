import * as React from 'react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'

import * as db from '@lib/db'
import * as api from '@lib/api'
import AppLayout from '@ui/layouts/App'
import { Box, Flex, Input, Button } from '@ui/base'
import Loading from '@ui/blocks/Loading'
import { Arrows } from '@ui/icons'
import Logo from '@ui/blocks/Logo'

const LoginPage: React.FC<{}> = () => {
  const router = useRouter()
  const { owner } = db.useOwner({ redirect: false })
  const [email, setEmail] = React.useState('')
  const [emailError, setEmailError] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordError, setPasswordError] = React.useState('')
  const [isRedirecting, setIsRedirecting] = React.useState(false)

  React.useEffect(() => {
    if (owner) router.replace('/business/dashboard')
  }, [owner, router])

  const [login, { status, error }] = useMutation(api.loginOwner, {
    throwOnError: true,
  })

  async function handleSubmit(event): Promise<void> {
    event.preventDefault()
    let valid = true

    if (!email) {
      valid = false
      setEmailError('Email muss ausgefüllt werden.')
    }

    if (!password) {
      valid = false
      setPasswordError('Passwort muss ausgefüllt werden.')
    }

    if (!valid) return

    const owner = await login({ email, password })
    setIsRedirecting(true)

    if (!owner.publicKey) {
      // If the owner has no publicKey here, it means the owner didn't finish
      // the onboarding correctly (or something went wrong). There's no keypair
      // yet. Send them back to the key setup.
      router.replace('/business/setup/key-intro')
    } else {
      router.replace('/business/dashboard')
    }
  }

  const handleEmailChange = React.useCallback((event) => {
    setEmailError(undefined)
    setEmail(event.target.value)
  }, [])

  const handlePasswordChange = React.useCallback((event) => {
    setPasswordError(undefined)
    setPassword(event.target.value)
  }, [])

  if (status === 'loading' || isRedirecting) {
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
        <form onSubmit={handleSubmit} css={{ width: '255px' }}>
          <Input
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
          />
          <Input
            id="password"
            type="password"
            label="Passwort"
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
          />
          <Box mt={5}>
            <Button
              type="submit"
              title="Login"
              right={<Arrows color="green" size="16px" />}
            />
          </Box>
        </form>
      </Flex>
    </AppLayout>
  )
}

export default LoginPage
