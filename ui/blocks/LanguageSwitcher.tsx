import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'

import useLocaleContext from '~locales/useLocaleContext'
import usePersistLocaleCookie from '~lib/hooks/usePersistLocaleCookie'
import { zIndexLanguageSwitcher } from '~ui/zIndexConstants'

import { Box, Text } from '~ui/core'
import { RoundTriangle } from '~ui/anicons'
import Link, { LinkHref } from '~ui/core/Link/Link'

const handlePreventDefault = (ev: React.SyntheticEvent) => ev.preventDefault()

const LanguageSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  const persistLocale = usePersistLocaleCookie()
  const { lang: currentLocale, pageLocales = [] } = useLocaleContext()

  const availableLocales = pageLocales.filter((el) => el !== currentLocale)

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const handleItemClick = useCallback(
    (ev: React.SyntheticEvent<HTMLAnchorElement>) => {
      const { locale } = ev.currentTarget.dataset

      persistLocale(locale)

      setTimeout(() => router.reload(), 300)
    },
    [router, persistLocale]
  )

  return (
    <>
      <Box
        zIndex={zIndexLanguageSwitcher}
        display="flex"
        overflow="visible"
        position="relative"
        alignItems="center"
        justifyContent="space-between"
        onClick={handleToggle}
        backgroundColor="white"
        css={{
          borderRadius: '4px',
          borderBottomLeftRadius: isOpen ? 0 : '4px',
          borderBottomRightRadius: isOpen ? 0 : '4px',
        }}
      >
        <Box
          padding="0.25rem 0.5rem"
          css={{ cursor: 'pointer', userSelect: 'none' }}
        >
          <Text variant="regular" fontSize="sm" fontWeight="bold">
            {currentLocale.toUpperCase()}
          </Text>
        </Box>

        <Box>
          <RoundTriangle variant={isOpen ? 'up' : 'down'} />
        </Box>

        <Box
          display={isOpen ? 'flex' : 'none'}
          flexDirection="column"
          position="absolute"
          top="100%"
          left="-1px"
          right="-1px"
          role="menu"
          backgroundColor="white"
          css={{
            borderBottomLeftRadius: '4px',
            borderBottomRightRadius: '4px',
          }}
        >
          {availableLocales.map((el) => {
            return (
              <Link
                as={router.asPath}
                href={router.pathname as LinkHref}
                key={el}
                locale={el}
                passHref={true}
              >
                <a
                  style={{
                    width: '100%',
                    borderTop: '1px solid rgba(0,0,0,0.15)',
                  }}
                  role="menuitem"
                  tabIndex={0}
                  data-locale={el}
                  onClick={handleItemClick}
                  onKeyPress={handlePreventDefault}
                >
                  <Text
                    variant="regular"
                    fontSize="sm"
                    css={{
                      padding: '0.25rem 0.5rem',
                      userSelect: 'none',
                      textTransform: 'uppercase',
                    }}
                  >
                    {el}
                  </Text>
                </a>
              </Link>
            )
          })}
        </Box>
      </Box>
    </>
  )
}

export default LanguageSwitcher
