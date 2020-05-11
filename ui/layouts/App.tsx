import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AnimatePresence } from 'framer-motion'
import { Box, Flex } from '@ui/base'
import Logo from '@ui/blocks/Logo'
import BottomBar from '@ui/blocks/BottomBar'

type AppLayoutProps = {
  children: React.ReactNode
  withHeader?: boolean
  withTabs?: boolean
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  withHeader = true,
  withTabs = true,
}) => {
  const router = useRouter()

  return (
    <Flex
      position="relative"
      maxWidth="480px"
      width="100%"
      mx="auto"
      flexDir="column"
      flex={1}
    >
      <Head>
        <title key="title">recover</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <AnimatePresence>
        {withHeader && (
          <Flex
            height={5}
            px={4}
            align="center"
            justify="space-between"
            position="sticky"
            top={0}
            zIndex={5}
            flex="0 0 auto"
          >
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
          </Flex>
        )}
      </AnimatePresence>
      <Flex
        position="relative"
        width="100%"
        zIndex={10}
        flex="1 0 auto"
        flexDir="column"
      >
        {children}
      </Flex>
      {withTabs && (
        <Box position="sticky" bottom={0} zIndex={15} bg="white">
          <BottomBar currentPath={router.pathname} />
        </Box>
      )}
    </Flex>
  )
}

export default AppLayout
