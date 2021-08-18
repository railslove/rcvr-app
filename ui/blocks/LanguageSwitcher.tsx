import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { SUPPORTED_LANGUAGES } from '~locales/constants'
import { RoundTriangle } from '~ui/anicons'
import { Box, Text } from '~ui/core'

const LanguageSwitcher: React.FC = () => {
  const router = useRouter()
  const currentLocale = router.locale
  const [isOpen, setIsOpen] = useState(false)

  const availableLocales = SUPPORTED_LANGUAGES.filter(
    (el) => el !== currentLocale
  )

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  return (
    <>
      <Box
        display="inline-flex"
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
          backgroundColor="white"
          css={{
            borderBottomLeftRadius: '4px',
            borderBottomRightRadius: '4px',
          }}
        >
          {availableLocales.map((el) => {
            return (
              <Link href={router.pathname} key={el} locale={el} passHref={true}>
                <a
                  style={{
                    width: '100%',
                    borderTop: '1px solid rgba(0,0,0,0.15)',
                  }}
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
