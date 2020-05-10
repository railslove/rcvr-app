import * as React from 'react'
import Link from 'next/link'
import { Flex, Box, Circle, Text } from '@ui/base'
import { Lock, Ticket, Virus } from '@ui/icons'

type BottomBarProps = {
  currentPath: string
}

const BottomBar: React.FC<BottomBarProps> = ({ currentPath }) => {
  return (
    <Flex flexDirection="row" height={6} align="flex-start" position="relative">
      <Box
        position="absolute"
        bottom="100%"
        height="20px"
        backgroundImage="linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))"
        left={0}
        right={0}
      />
      <Tab
        href="/privacy"
        icon={<Lock />}
        title="Datenschutz"
        active={currentPath === '/privacy'}
        color="yellow"
      />
      <Tab
        href="/my-checkins"
        icon={<Ticket />}
        title="Tickets"
        active={currentPath === '/my-checkins'}
        color="yellow"
      />
      <Tab
        href="/info"
        icon={<Virus />}
        title="Corona"
        active={currentPath === '/info'}
        color="red"
      />
    </Flex>
  )
}

type TabProps = {
  href: string
  icon: React.ReactNode
  title: string
  active?: boolean
  color: string
}

const Tab: React.FC<TabProps> = ({ href, icon, title, active, color }) => {
  return (
    <Link href={href}>
      <Flex as="a" align="center" flexDirection="column" flex="1 0 33.333%">
        <Box mb={1}>
          <Circle size="38px" color={active && color}>
            {icon}
          </Circle>
        </Box>
        <Text fontSize="xs" fontWeight="semibold">
          {title}
        </Text>
      </Flex>
    </Link>
  )
}

export default BottomBar
