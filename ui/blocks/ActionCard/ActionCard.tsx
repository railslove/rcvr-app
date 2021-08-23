import * as React from 'react'
import Link, { LinkHref } from '~ui/core/Link/Link'
import { Card, SRText, Row, Text, Box, Icon } from '~ui/core'

import useLocaleObject from '~locales/useLocaleObject'
import ActionCardLocales from '~ui/blocks/ActionCard/ActionCard.locales'

interface Props {
  href?: LinkHref
  as?: string
  onClick?: () => void
  children: React.ReactNode
}

interface Composition {
  Main: MainCmp
  Actions: ActionsCmp
  Below: BelowCmp
}

type AreaCardCmps = React.FC<Props> & Composition

export const ActionCard: AreaCardCmps = ({ href, as, onClick, children }) => {
  const { t } = useLocaleObject(ActionCardLocales)

  return (
    <Card
      css={{ position: 'relative', textAlign: 'left' }}
      as={onClick ? 'button' : 'div'}
      onClick={onClick}
    >
      <>
        <Row flexWrap="wrap" alignItems="center" px={4} py={2}>
          {children}
        </Row>
        {href && (
          <Link href={href} as={as}>
            <a
              css={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
                cursor: 'pointer',
              }}
            >
              <SRText>{t('navigateToSite')}</SRText>
            </a>
          </Link>
        )}
      </>
    </Card>
  )
}

interface MainProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  icon?: React.FC
}
type MainCmp = React.FC<MainProps>
const Main = ({ title, subtitle, icon }) => {
  return (
    <Row py={2} pr={2} flex="1 1 auto" maxWidth="100%">
      <Box flex="1 0 auto" maxWidth="100%">
        <Text variant="h5">{title}</Text>
        {subtitle && (
          <Text
            color="bluegrey.600"
            fontSize="sm"
            css={{ wordBreak: 'break-word' }}
          >
            {subtitle}
          </Text>
        )}
      </Box>
      {icon && (
        <Row flex="0 0 auto" mr={-3} alignItems="center">
          <Icon icon={icon} color="bluegrey.500" size={4} />
        </Row>
      )}
    </Row>
  )
}

interface ActionsProps {
  children?: React.ReactNode
}
type ActionsCmp = React.FC<ActionsProps>
const Actions = ({ children }) => {
  return (
    <Row
      flex="0 0 auto"
      flexWrap="wrap"
      mx={-2}
      my={-1}
      maxWidth="100%"
      css={{ position: 'relative', zIndex: 2 }}
    >
      {React.Children.map(children, (child) => (
        <Box m={1}>{child}</Box>
      ))}
    </Row>
  )
}

interface BelowProps {
  children?: React.ReactNode
}
type BelowCmp = React.FC<BelowProps>
const Below = ({ children }) => {
  return (
    <Box minWidth={0} width="100%">
      {children}
    </Box>
  )
}

ActionCard.Main = Main
ActionCard.Actions = Actions
ActionCard.Below = Below
