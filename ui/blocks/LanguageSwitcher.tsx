import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import { SUPPORTED_LANGUAGES } from '~locales/constants'
import { Box } from '~ui/core'

const LanguageSwitcher: React.FC = () => {
  const router = useRouter()

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      marginTop={5}
    >
      {SUPPORTED_LANGUAGES.map((el) => {
        const isSelected = router.locale === el

        return (
          <Fragment key={el}>
            <Link href={router.pathname} key={el} locale={el} passHref={true}>
              <a
                style={{
                  color: 'blue',
                  textDecoration: isSelected ? 'underline' : undefined,
                }}
              >
                {el}
              </a>
            </Link>
            <Box width={4} />
          </Fragment>
        )
      })}
    </Box>
  )
}

export default LanguageSwitcher
