import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import { motion } from 'framer-motion'
import formatDate from 'intl-dateformat'
import Head from 'next/head'
import Link, { LinkHref } from '~ui/core/Link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { CompanyRes, DataRequestRes } from '~lib/api'
import { useCompanies, useModals, useOwner } from '~lib/hooks'
import { useUnacceptedDataRequests } from '~lib/hooks/useUnacceptedDataRequests'
import { FetchingIndicator } from '~ui/blocks/FetchingIndicator'
import { SharedMeta } from '~ui/blocks/SharedMeta'
import { Box, Callout, CloseButton, Icon, Row, Text } from '~ui/core'
import { BusinessDataModal } from '~ui/modals/BusinessDataModal'
import { PrivateKeyModal } from '~ui/modals/PrivateKeyModal'
import { Back } from '~ui/svg'
import { Logo, pageTitle } from '~ui/whitelabels'

interface Props {
  children: React.ReactNode
  title: React.ReactNode
}

export const OwnerApp: React.FC<Props> = ({ children, title }) => {
  const { data: companies } = useCompanies()
  const { data: owner } = useOwner()
  const { data: unacceptedDataRequests } = useUnacceptedDataRequests()
  const router = useRouter()

  const { modals, openModal } = useModals({
    data: BusinessDataModal,
    privateKey: PrivateKeyModal,
  })

  React.useEffect(() => {
    if (!owner.publicKey) {
      router.replace('/business/setup/success')
    }
  }, [])

  const [hint, setHint] = React.useState(() => {
    return localStorage.getItem('hintclosed') !== '1'
  })
  const closeHint = () => {
    setHint(false)
    localStorage.setItem('hintclosed', '1')
  }

  const isEmptyString = (string) => !string?.trim()

  const companiesWithoutAddress = companies?.filter((company) => {
    return (
      isEmptyString(company.street) ||
      isEmptyString(company.zip) ||
      isEmptyString(company.city)
    )
  })

  const getCompanyName = (companyId) =>
    companies?.find((company: CompanyRes) => company.id === companyId)?.name

  const formatDateRange = (dataRequest: DataRequestRes) => {
    const dateRange =
      dataRequest?.from && dataRequest?.to
        ? formatDate(dataRequest.from, 'DD.MM.YYYY HH:mm') +
          ' – ' +
          formatDate(dataRequest.to, 'DD.MM.YYYY HH:mm')
        : ''
    return dateRange
  }

  return (
    <Limit>
      {modals}
      <SharedMeta />
      <Head>
        <title key="title">
          {title ?? '____'} | {pageTitle}
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
          {Object.keys(unacceptedDataRequests || {}).length > 0 && (
            <>
              <Callout variant="danger">
                <Text>
                  Dringend: Datenfreigabe für das Gesundheitsamt erforderlich!
                </Text>
                <RequestList>
                  {Object.keys(unacceptedDataRequests).map(
                    (companyId: string) => {
                      return unacceptedDataRequests[companyId]
                        .map((dataRequest: DataRequestRes) => {
                          return (
                            <li key={`${companyId}-${dataRequest.id}`}>
                              <Link
                                href="/business/company/[companyId]/data-request/[dataRequestId]"
                                as={`/business/company/${companyId}/data-request/${dataRequest.id}`}
                              >
                                <a>
                                  {getCompanyName(companyId)} -{' '}
                                  {formatDateRange(dataRequest)}
                                </a>
                              </Link>
                            </li>
                          )
                        })
                        .flat()
                    }
                  )}
                </RequestList>
              </Callout>
              <Box height={6} />
            </>
          )}
          {owner.blockAt && (
            <>
              <Callout variant={owner.blockAt < new Date() ? 'danger' : 'warn'}>
                <Text>
                  recover steht Dir aktuell bis&nbsp;
                  {formatDate(owner.trialEndsAt, 'DD.MM.YYYY')} in vollem Umfang
                  zur Verfügung, dann hast du noch zwei Tage um die Bezahldaten
                  anzugeben. Wenn Du recover nach dem{' '}
                  {formatDate(owner.blockAt, 'DD.MM.YYYY')} weiter für Checkins
                  nutzen möchtest, bitten wir Dich im Profil-Bereich Deine
                  Zahlungsinformationen zu bearbeiten.
                </Text>
                <Text>
                  Selbstverständlich wirst Du weiter Zugriff auf Dein Konto
                  haben, sowie Informationen zu alten Checkins anfordern und ans
                  Gesundheitsamt weiterleiten können.
                </Text>
              </Callout>
              <Box height={6} />
            </>
          )}
          {hint && (
            <>
              <Callout>
                <CloseButton onClose={closeHint} />
                <Box height={2} />
                <ol>
                  <li>1. Betrieb anlegen</li>
                  <li>2. Bereich in einem Betrieb anlegen</li>
                  <li>3. Pro Bereich einen QR-Code anlegen und ausdrucken</li>
                </ol>
              </Callout>
              <Box height={6} />
            </>
          )}
          {companiesWithoutAddress?.length > 0 && (
            <>
              <Callout variant="danger">
                <Text>
                  Wichtiger Hinweis: Um im Corona-Positivfall Kontakte und
                  Ereignisse zuordnen zu können, benötigt das Gesundheitsamt
                  Angaben zum Standort Deiner Betriebe. Bitte trage noch bei
                  allen Betrieben die Adresse nach. Diese ist mittlerweile eine
                  Pflichtangabe. Vielen Dank!
                </Text>
                <Box height={2} />
                {companiesWithoutAddress.length > 1 ? (
                  <Text>Bitte die folgenden Betriebe vervollständigen:</Text>
                ) : (
                  <Text>Bitte den folgenden Betrieb vervollständigen:</Text>
                )}
                <Box height={2} />
                <UnorderedList>
                  {companiesWithoutAddress.map((company: CompanyRes) => (
                    <li key={company.id}>
                      <ButtonWithCursor
                        onClick={() =>
                          owner.privateKey
                            ? openModal('data', {
                                type: 'edit',
                                owner: owner,
                                company: company,
                              })
                            : openModal('privateKey', { ownerId: owner.id })
                        }
                      >
                        {company.name}
                      </ButtonWithCursor>
                    </li>
                  ))}
                </UnorderedList>
              </Callout>
              <Box height={6} />
            </>
          )}

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
  href: LinkHref
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
  href: LinkHref
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

const UnorderedList = styled('div')(
  css({
    listStyleType: 'disc',
    marginLeft: 3,
  })
)

const ButtonWithCursor = styled('button')(
  css({
    color: 'red.600',
    cursor: 'pointer',
  })
)

const RequestList = styled('ul')(
  css({
    listStyle: 'disc',
    marginLeft: 8,
    marginTop: 2,
    li: {
      marginBottom: 1,
    },
    '* a': {
      textDecoration: 'underline',
    },
  })
)
