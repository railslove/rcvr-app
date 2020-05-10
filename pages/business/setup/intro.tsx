import * as React from 'react'
import { useOwner } from '@lib/db'
import { Text, Button } from '@ui/base'
import Link from 'next/link'
import { Arrows } from '@ui/icons'
import BusinessLayout from '@ui/layouts/Business'

type IntroPageProps = {}

const IntroPage: React.FC<IntroPageProps> = () => {
  useOwner()

  return (
    <BusinessLayout>
      <Text fontSize="xl" fontWeight="bold" mb={5}>
        Willkommen bei Recover.
      </Text>
      <Text fontSize="l" fontWeight="bold" mb={5}>
        Zuerst kümmern wir uns um den Schutz der Kundendaten.
      </Text>
      <Text fontSize="l" fontWeight="bold" mb={5}>
        Danach können Sie QR Codes generieren, mit denen sich ihre Gäste
        einchecken können.
      </Text>
      <Text fontSize="l" color="red" fontWeight="xbold" mb={5}>
        Nehmen Sie sich etwas Zeit und befolgen Sie die folgenden Schritte
        sorgfältig.
      </Text>
      <Link href="/business/setup/keys">
        <a css={{ textDeocration: 'none' }}>
          <Button title="Starten" right={<Arrows size="16px" color="pink" />} />
        </a>
      </Link>
    </BusinessLayout>
  )
}

export default IntroPage
