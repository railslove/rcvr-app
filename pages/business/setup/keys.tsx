import * as React from 'react'
import { useRouter } from 'next/router'
import { generateKeys, base64ToHex } from '@lib/crypto'
import * as db from '@lib/db'
import { Box, Text, Button } from '@ui/base'
import { Arrows } from '@ui/icons'
import KeyViewer from '@ui/blocks/KeyViewer'
import AppLayout from '@ui/layouts/App'

type KeysPageProps = {}

const KeysPage: React.FC<KeysPageProps> = () => {
  const router = useRouter()
  const { owner } = db.useOwner()
  const didGenerateKeys = React.useRef(false)
  const [hexPrivateKey, setHexPrivateKey] = React.useState<string | undefined>()

  const handleNext = React.useCallback(() => {
    if (confirm('Haben Sie sich den Schlüssel notiert?')) {
      router.push('/business/setup/verify-key')
    }
  }, [router])

  React.useEffect(() => {
    if (!owner) return

    async function main(): Promise<void> {
      if (owner.privateKey) {
        setHexPrivateKey(base64ToHex(owner.privateKey))
        return
      }

      if (didGenerateKeys.current === false) {
        const { privateKey, publicKey } = generateKeys()
        didGenerateKeys.current = true
        await db.updateOwner(owner.id, { privateKey, publicKey })
        setHexPrivateKey(base64ToHex(owner.privateKey))
      }
    }

    main()
  }, [owner])

  return (
    <AppLayout withTabs={false}>
      <Box px={4} py={5}>
        <Text fontSize="xl" fontWeight="bold" mb={5}>
          Ihr geheimer Schlüssel.
        </Text>
        {hexPrivateKey && (
          <>
            <Text fontSize="s" fontWeight="bold">
              Ihr Schlüssel ist {hexPrivateKey.length} Zeichen lang, in{' '}
              {hexPrivateKey.length / 2} Blöcken.
            </Text>
            <Text fontSize="s" fontWeight="bold" mb={4}>
              Er beinhaltet nur Zahlen von 0 bis 9 und Großbuchstaben von A bis
              F.
            </Text>
            <Box my={5} mx={-4}>
              <KeyViewer value={hexPrivateKey} />
            </Box>
          </>
        )}
        <Text fontSize="m" fontWeight="xbold" color="red" mb={2}>
          Es ist sehr wichtig, dass Sie sich diesen Schlüssel notieren.
        </Text>
        <Text fontSize="m" fontWeight="bold" mb={5}>
          Schreiben Sie den Schlüssel zum Beispiel auf ein Stück Papier und
          behalten ihn sorgfältig in Ihren Unterlagen. Sie können auch einen
          Passwortmanager nutzen. Ohne den Schlüssel sind die Kundendaten nicht
          mehr einsehbar.
        </Text>
        <Button
          title="Schlüssel ist notiert"
          onClick={handleNext}
          right={<Arrows size="16px" color="pink" />}
        />
      </Box>
    </AppLayout>
  )
}

export default KeysPage
