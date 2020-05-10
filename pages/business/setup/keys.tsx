import * as React from 'react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { generateKeys, base64ToHex } from '@lib/crypto'
import * as db from '@lib/db'
import * as api from '@lib/api'
import { Box, Flex, Text, Button } from '@ui/base'
import { Arrows } from '@ui/icons'
import KeyViewer from '@ui/blocks/KeyViewer'
import Loading from '@ui/blocks/Loading'
import BusinessLayout from '@ui/layouts/Business'

type KeysPageProps = {}

const KeysPage: React.FC<KeysPageProps> = () => {
  const router = useRouter()
  const { owner } = db.useOwner()
  const didGenerateKeys = React.useRef(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [hexPrivateKey, setHexPrivateKey] = React.useState<string | undefined>()
  const [update] = useMutation(api.updateOwner, {
    throwOnError: true,
  })

  const handleNext = React.useCallback(() => {
    if (confirm('Haben Sie sich den Schlüssel notiert?')) {
      router.push('/business/setup/verify-key')
    }
  }, [router])

  React.useEffect(() => {
    if (!owner) return

    async function main(): Promise<void> {
      if (owner.privateKey) {
        await update({ id: owner.id, publicKey: owner.publicKey })
        setHexPrivateKey(base64ToHex(owner.privateKey))
        setIsLoading(false)
        return
      }

      if (didGenerateKeys.current === false) {
        const { privateKey, publicKey } = generateKeys()
        didGenerateKeys.current = true
        await update({ id: owner.id, publicKey: owner.publicKey })
        await db.updateOwner(owner.id, { privateKey, publicKey })
        setHexPrivateKey(base64ToHex(privateKey))
        setIsLoading(false)
      }
    }

    main()
  }, [owner, update])

  return (
    <BusinessLayout>
      <Text fontSize="xl" fontWeight="bold" mb={5}>
        Ihr geheimer Schlüssel.
      </Text>
      {isLoading && (
        <Flex mt="120px" align="center" flexDirection="column">
          <Loading />
          <Text fonSize="m" mt={3}>
            Schlüssel wird vorbereitet...
          </Text>
        </Flex>
      )}
      {hexPrivateKey && (
        <>
          <Text fontSize="s" fontWeight="bold">
            Ihr Schlüssel ist {hexPrivateKey.length} Zeichen lang, in{' '}
            {hexPrivateKey.length / 2} Blöcken.
          </Text>
          <Text fontSize="s" fontWeight="bold" mb={4}>
            Er beinhaltet nur Zahlen von 0 bis 9 und Großbuchstaben von A bis F.
          </Text>
          <Box my={5} mx={-4}>
            <KeyViewer value={hexPrivateKey} />
          </Box>
        </>
      )}
      {!isLoading && (
        <>
          <Text fontSize="m" fontWeight="xbold" color="red" mb={2}>
            Es ist sehr wichtig, dass Sie sich diesen Schlüssel notieren.
          </Text>
          <Text fontSize="m" fontWeight="bold" mb={5}>
            Schreiben Sie den Schlüssel zum Beispiel auf ein Stück Papier und
            behalten ihn sorgfältig in Ihren Unterlagen. Sie können auch einen
            Passwortmanager nutzen. Ohne den Schlüssel sind die Kundendaten
            nicht mehr einsehbar.
          </Text>
          <Button
            title="Schlüssel ist notiert"
            onClick={handleNext}
            right={<Arrows size="16px" color="pink" />}
          />
        </>
      )}
    </BusinessLayout>
  )
}

export default KeysPage
