import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { generateKeys, base64ToHex } from '@lib/crypto'
import * as db from '@lib/db'
import * as api from '@lib/api'
import { Flex, Text, Button, Box } from '@ui/base'
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
    if (confirm('Hast du dir den Schlüssel notiert?')) {
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

      if (!owner.publicKey && didGenerateKeys.current === false) {
        const { privateKey, publicKey } = generateKeys()
        didGenerateKeys.current = true
        await update({ id: owner.id, publicKey })
        await db.updateOwner(owner.id, { privateKey, publicKey })
        setHexPrivateKey(base64ToHex(privateKey))
        setIsLoading(false)
      }
    }

    main()
  }, [owner, update])

  if (owner?.publicKey && !owner?.privateKey) {
    return (
      <BusinessLayout>
        <Text fontSize="l" fontWeight="bold" mb={5}>
          Du hast schonmal einen Schlüssel generiert.
        </Text>
        <Link href="/business/dashboard">
          <a css={{ textDeocration: 'none' }}>
            <Button
              title="Zum Dashboard"
              right={<Arrows size="16px" color="pink" />}
            />
          </a>
        </Link>
      </BusinessLayout>
    )
  }

  return (
    <BusinessLayout>
      <Head>
        <title key="title">Dein Schlüssel | recover</title>
      </Head>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Dein geheimer Schlüssel.
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
          <Text fontSize="m" fontWeight="xbold" mb={2}>
            Hier ist dein privater Schlüssel. Er ist {hexPrivateKey.length}{' '}
            Zeichen lang, in {hexPrivateKey.length / 2} Blöcken.
            <br />
            Er beinhaltet nur Zahlen von 0 bis 9 und Großbuchstaben von A bis F.
          </Text>
          <Flex my={3} justify="center" mx={-4}>
            <KeyViewer value={hexPrivateKey} />
          </Flex>
        </>
      )}
      {!isLoading && (
        <>
          <Text fontSize="m" fontWeight="xbold" color="red" mb={3}>
            Es ist sehr wichtig, dass Du diesen Schlüssel notierst.
          </Text>
          <Text fontSize="m" fontWeight="semibold" mb={3}>
            Schreib den Schlüssel zum Beispiel auf einen Zettel und verwahre ihn
            sorgfältig. Du kannst ihn auch in einem Passwortmanager speichern.
          </Text>
          <Text fontSize="m" fontWeight="semibold" mb={4}>
            Im nächsten Schritt stellen wir sicher, dass Du den Schlüssel auch
            korrekt notiert hast.
          </Text>
          <Box mb={4}>
            <Button
              title="Schlüssel ist notiert"
              onClick={handleNext}
              right={<Arrows size="16px" color="pink" />}
            />
          </Box>
        </>
      )}
    </BusinessLayout>
  )
}

export default KeysPage
