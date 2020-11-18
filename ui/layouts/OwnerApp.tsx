import * as React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import Link from 'next/link'
import { motion } from 'framer-motion'
import formatDate from 'intl-dateformat'

import { useCompanies, useOwner } from '~lib/hooks'
import { Box, Text, Icon, Row, Callout } from '~ui/core'
import { isCareEnv } from '~lib/config'
import { Logo } from '~ui/whitelabels'
import { Back } from '~ui/svg'
import { SharedMeta } from '~ui/blocks/SharedMeta'
import { FetchingIndicator } from '~ui/blocks/FetchingIndicator'
import { Close } from '~ui/svg'
import { relative } from 'path'

interface Props {
  children: React.ReactNode
  title: React.ReactNode
}

export const OwnerApp: React.FC<Props> = ({ children, title }) => {
  const { data: companies } = useCompanies()
  const { data: owner } = useOwner()

  const [hint, setHint] = React.useState(() => {
    return localStorage.getItem('hintclosed') !== '1'
  })
  const closeHint = () => {
    setHint(false)
    localStorage.setItem('hintclosed', '1')
  }

  return (
    <Limit>
      <SharedMeta />
      <Head>
        <title key="title">
          {title ?? '____'} | {isCareEnv ? 'recover care' : 'recover'}
        </title>
      </Head>
      <Top>
        <LogoBox layoutId="appLogo">
          <Logo />
        </LogoBox>
        <FetchingIndicator />
        <MobileMenu>
          <li>
            <NavLink href="/business/dashboard">Betriebe</NavLink>
          </li>
          <li>
            <NavLink href="/business/profile">Profil</NavLink>
          </li>
        </MobileMenu>
      </Top>
      <Wrapper>
        <Aside>
          <ul>
            <li>
              <NavLink href="/business/dashboard">Meine Betriebe</NavLink>
            </li>
            {companies?.map((company) => (
              <li key={company.id}>
                <NavLink
                  href="/business/company/[companyId]"
                  as={`/business/company/${company.id}`}
                >
                  {company.name}
                </NavLink>
                <ul>
                  <li>
                    <NavLink
                      href="/business/company/[companyId]/area"
                      as={`/business/company/${company.id}/area`}
                      sub
                    >
                      Bereiche
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      href="/business/company/[companyId]/checkins"
                      as={`/business/company/${company.id}/checkins`}
                      sub
                    >
                      Checkins
                    </NavLink>
                  </li>
                </ul>
              </li>
            ))}
            <li>
              <NavLink href="/business/profile">Mein Profil</NavLink>
            </li>
          </ul>
        </Aside>
        <Main>
          {owner.blockAt && (
            <>
              {owner.blockAt < new Date() ? (
                <Callout variant="danger">
                  <Text>
                    Sie haben aktuell keine aktive Subscription. Bitte gehen Sie
                    auf Ihre Profil Seite um Ihre Zahlungsinformationen zu
                    überprüfen.
                  </Text>
                  <Text>
                    Seit dem {formatDate(owner.blockAt, 'DD.MM.YYYY')} sind
                    keine neuen Checkins mehr möglich. Selbstverständlich haben
                    Sie weiterhin Zugriff auf Ihr Konto und können Informationen
                    zu alten Checkins anfordern und ans Gesundheitsamt
                    weiterleiten.
                  </Text>
                </Callout>
              ) : (
                <Callout variant="warn">
                  <Text>
                    Sie haben aktuell keine aktive Subscription. Bitte gehen Sie
                    auf Ihre Profil Seite um Ihre Zahlungsinformationen zu
                    überprüfen.
                  </Text>
                  <Text>
                    Ab dem {formatDate(owner.blockAt, 'DD.MM.YYYY')} werden
                    keine neuen Checkins mehr möglich sein. Selbstverständlich
                    werden Sie weiterhin Zugriff auf Ihr Konto haben und
                    Informationen zu alten Checkins anfordern und ans
                    Gesundheitsamt weiterleiten können.
                  </Text>
                </Callout>
              )}
            </>
          )}
          {hint && (
            <>
              <Box height={6} />
              <Callout>
                <CloseContainer>
                  <CloseIcon icon={Close} size={5} onClick={closeHint} />
                </CloseContainer>
                <Box height={2} />
                <ol>
                  <li>1. Betrieb anlegen</li>
                  <li>2. Bereich in deinem Betrieb anlegen</li>
                  <li>3. Pro Bereich einen QR-Code anlegen und ausdrucken</li>
                </ol>
              </Callout>
            </>
          )}
          <Box height={6} />
          <Text as="h2" variant="h2">
            {title ?? <>&nbsp;</>}
          </Text>
          <Box height={6} />
          {children}
        </Main>
      </Wrapper>
    </Limit>
  )
}

interface BackProps {
  href: string
  as?: string
  children?: React.ReactNode
}
export const BackLink: React.FC<BackProps> = ({ href, as, children }) => {
  return (
    <Box mt={-4} mb={6} display={['block', 'block', 'none']}>
      <Link href={href} as={as} passHref>
        <Row as="a" alignItems="center" css={{ display: 'inline-flex' }}>
          <Icon
            icon={Back}
            size={4}
            css={{ marginTop: -2 }}
            color="bluegrey.400"
          />
          <Box width={1} />
          <Text variant="h5" color="bluegrey.400">
            {children}
          </Text>
        </Row>
      </Link>
    </Box>
  )
}

interface NavLinkProps {
  href: string
  as?: string
  sub?: boolean
  children: React.ReactNode
}
const NavLink = ({ href, as, sub, children }: NavLinkProps) => {
  const router = useRouter()
  const routeMatches = router.asPath.includes(as || href)

  return (
    <Link href={href} as={as} passHref>
      <Text
        variant={sub ? 'h5' : 'h3'}
        underline={routeMatches ? 'prominent' : undefined}
        as="a"
      >
        {children}
      </Text>
    </Link>
  )
}

const Limit = styled('div')(
  css({
    py: 8,
    px: [4, 4, 8],
    width: '100%',
    maxWidth: '1024px',
    mx: 'auto',
  })
)

const Wrapper = styled('div')(
  css({
    display: 'flex',
  })
)

const Top = styled('div')(
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    pb: 6,
  })
)

const Aside = styled('aside')(
  css({
    display: ['none', 'none', 'block'],
    pr: 6,
    mr: 6,
    flex: '1 0 auto',
    maxWidth: '220px',
    borderRight: '1px solid',
    borderColor: 'bluegrey.100',

    '> ul > li': {
      mb: 6,
    },

    'ul ul': {
      mt: 2,
      ml: 4,
    },

    'ul ul li': {
      mb: 2,
    },
  })
)

const MobileMenu = styled('ul')(
  css({
    display: ['flex', 'none', 'none'],
    '> li': {
      mr: 2,
    },
  })
)

const Main = styled('main')(
  css({
    flex: '1 1 auto',
    maxWidth: '100%',
  })
)

const LogoBox = styled(motion.div)(
  css({
    width: ['61px', '61px', '120px'],
    height: ['10px', '10px', '20px'],

    svg: {
      display: 'block',
      width: '100%',
      height: '100%',
    },
  })
)

const CloseContainer = styled('div')(
  css({
    position: 'relative',
  })
)

const CloseIcon = styled(Icon)(
  css({
    position: 'absolute',
    right: 0,
  })
)
