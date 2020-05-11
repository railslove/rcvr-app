import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { base64ToHex } from '@lib/crypto'
import * as db from '@lib/db'
import { Box, Text, Button } from '@ui/base'
import { Arrows } from '@ui/icons'
import BusinessLayout from '@ui/layouts/Business'
import KeyInput from '@ui/blocks/KeyInput'

type VerifyKeyProps = {}

const VerifyKey: React.FC<VerifyKeyProps> = () => {
  const router = useRouter()
  const { owner } = db.useOwner()
  const keyInput = React.useRef('')
  const [isWrong, setIsWrong] = React.useState(false)

  const handleKeyInputChange = React.useCallback(
    (value) => {
      keyInput.current = value
      setIsWrong(false)
    },
    [keyInput]
  )

  const handleNext = React.useCallback(() => {
    const cleanKey = keyInput.current.replace(/\s/g, '')
    if (cleanKey === base64ToHex(owner.privateKey)) {
      router.push('/business/setup/finished')
      return
    }

    setIsWrong(true)
  }, [router, owner])

  return (
    <BusinessLayout>
      <Text fontSize="xl" fontWeight="bold" mb={5}>
        Schlüssel eingeben.
      </Text>

      <Text fontSize="s" fontWeight="bold" mb={3}>
        Bitte geben den Schlüssel nun nochmals ein. Damit bestätigst du, dass du
        ihn korrekt notiert hast.
      </Text>
      {isWrong && (
        <Text fontSize="s" fontWeight="xbold" color="red" mb={3}>
          Der Schlüssel stimmt nicht überein. Du kannst ihn korrigieren oder{' '}
          <Link href="/business/setup/keys">
            <a css={{ color: 'inherit', textDecoration: 'underline' }}>
              zurück gehen und erneut anschauen.
            </a>
          </Link>
        </Text>
      )}
      <Box my={5} mx={-4}>
        <KeyInput onChange={handleKeyInputChange} />
      </Box>
      <Text fontSize="s" fontWeight="bold" mb={3}>
        Schreib alle Zeichen hintereinander, ohne Leerzeichen. Denk dran: der
        Schlüssel beinhaltet nur Zahlen von 0 bis 9 und Buchstaben von A bis F.
      </Text>

      <Text fontSize="s" fontWeight="bold" mb={5}>
        Alles eingegeben? Dann überprüfen wir, ob der Schlüssel stimmt.
      </Text>

      <Button
        title="Überprüfen"
        onClick={handleNext}
        right={<Arrows size="16px" color="pink" />}
      />
      <Box
        textAlign="center"
        fontSize="s"
        fontWeight="bold"
        color="bluegrey.800"
        mt={4}
      >
        <Link href="/business/setup/keys">
          <a css={{ color: 'inherit', textDecoration: 'none' }}>Zurück</a>
        </Link>
      </Box>
    </BusinessLayout>
  )
}

export default VerifyKey
