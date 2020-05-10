import * as React from 'react'
import * as db from '@lib/db'
import { useRouter } from 'next/router'
import AppLayout from '@ui/layouts/App'
import Link from 'next/link'
import { Box, Flex, Button } from '@ui/base'
import { Arrows } from '@ui/icons'
import Logo from '@ui/blocks/Logo'

const BusinessIndex: React.FC<{}> = () => {
  const router = useRouter()
  const { owner } = db.useOwner({ redirect: false })
  React.useEffect(() => {
    if (owner) router.replace('/business/dashboard')
  }, [owner, router])

  return (
    <AppLayout withHeader={false} withTabs={false}>
      <Flex flexDirection="column" justify="center" flex={1}>
        <Box mb={6} mx="auto">
          <Logo width="124px" height="20px" />
        </Box>
        <Box px={3} mb={4}>
          <Link href="/business/signup">
            <a css={{ textDeocration: 'none' }}>
              <Button
                title="Neu? Jetzt registrieren"
                right={<Arrows size="16px" color="pink" />}
              />
            </a>
          </Link>
        </Box>
        <Box px={3}>
          <Link href="/business/login">
            <a css={{ textDeocration: 'none' }}>
              <Button
                title="Ich habe einen Account"
                right={<Arrows size="16px" color="pink" />}
              />
            </a>
          </Link>
        </Box>
      </Flex>
    </AppLayout>
  )
}

export default BusinessIndex
