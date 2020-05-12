import * as React from 'react'
import AppLayout from '@ui/layouts/App'
import Link from 'next/link'
import { Box, Flex, Button } from '@ui/base'
import { Arrows } from '@ui/icons'
import Logo from '@ui/blocks/Logo'

const Home: React.FC<{}> = () => {
  return (
    <AppLayout withHeader={false}>
      <Flex flexDirection="column" justify="center" flex={1}>
        <Box mb={6} mx="auto">
          <Logo width="124px" height="20px" />
        </Box>
        <Box px={3} mb={4}>
          <Link href="/qr">
            <a css={{ textDeocration: 'none' }}>
              <Button
                title="QR Code Scannen"
                right={<Arrows size="16px" color="pink" />}
              />
            </a>
          </Link>
        </Box>
        <Box px={3} mb={4}>
          <Link href="/my-checkins">
            <a css={{ textDeocration: 'none' }}>
              <Button
                title="Meine Tickets"
                right={<Arrows size="16px" color="pink" />}
              />
            </a>
          </Link>
        </Box>
        <Box px={3}>
          <Link href="/business">
            <a css={{ textDeocration: 'none' }}>
              <Button
                title="Für Betriebe"
                right={<Arrows size="16px" color="pink" />}
              />
            </a>
          </Link>
        </Box>
      </Flex>
    </AppLayout>
  )
}

export default Home
