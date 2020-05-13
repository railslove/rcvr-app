import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Flex, Text } from '@ui/base'
import Logo from '@ui/blocks/Logo'
import Loading from '@ui/blocks/Loading'
import SharedMeta from '@ui/blocks/SharedMeta'

type BusinessLayoutProps = {
  children?: React.ReactNode
  title?: React.ReactNode
  loading?: boolean
}

const BusinessLayout: React.FC<BusinessLayoutProps> = ({
  children,
  title,
  loading,
}) => {
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
        <title key="title">{title ? title + ' | ' : ''} recover</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <SharedMeta />
      <Flex
        height={5}
        px={4}
        align="center"
        justify="space-between"
        flex="0 0 auto"
      >
        <Link href="/business/dashboard">
          <a>
            <Logo />
          </a>
        </Link>
      </Flex>
      <Flex
        position="relative"
        width="100%"
        zIndex={10}
        px={4}
        pt={2}
        pb={4}
        flex="1 0 auto"
        flexDir="column"
      >
        {title && (
          <Text as="h1" fontSize="l" fontWeight="bold" mb={4} mt={2}>
            {title}
          </Text>
        )}
        {loading && (
          <Flex justify="center" mt={6} mb={6}>
            <Loading />
          </Flex>
        )}
        {children}
      </Flex>
    </Flex>
  )
}

export default BusinessLayout
