import * as React from 'react'
import Head from 'next/head'

import { Text, Card, Box } from '~ui/core'
import { isFormal } from '~lib/config'
import { ArrowsLeft, ArrowsRight } from '~ui/anicons'
import { MobileApp } from '~ui/layouts/MobileApp'
import { useRouter } from 'next/router'

export default function QRCodePage() {
  const videoEl = React.useRef<HTMLVideoElement>()

  const router = useRouter()

  const paramsRef = React.useRef<object>({})

  paramsRef.current = {
    name: router.query.name?.toString(),
    phone: router.query.phone?.toString(),
    address: router.query.address?.toString(),
  }

  function appendGuestInfo(url: string): any {
    Object.entries(paramsRef.current).forEach((entry) => {
      if (entry[1]) {
        url = url.concat(`&${entry[0]}=${entry[1]}`)
      }
    })
    return url
  }

  React.useEffect(() => {
    let qrCodeReader: any

    async function mountAndWaitForScan() {
      // @zxing/library doesn't play nicely with Next's SSR, thus we need to
      // import it on mount.
      try {
        const { BrowserQRCodeReader } = await import('@zxing/library')
        qrCodeReader = new BrowserQRCodeReader()
        const result = await qrCodeReader.decodeFromInputVideoDevice(
          undefined,
          videoEl.current
        )
        window.location.href = appendGuestInfo(result.getText())
      } catch (error) {
        console.error('Failed mountAndWaitForScan:', error)
      }
    }

    mountAndWaitForScan()

    return () => qrCodeReader?.reset()
  }, [])

  return (
    <MobileApp logoVariant="big">
      <Head>
        <title key="title">QR-Code scannen | recover</title>
      </Head>
      <Text as="h2" variant="h2">
        QR-Code scannen
      </Text>
      <Box height={4} />
      <Text>
        {isFormal
          ? 'Scannen Sie den QR-Code im Eingangsbereich.'
          : 'Scanne den QR-Code, den Du auf dem Tisch teilnehmender Betriebe findest.'}
      </Text>
      <Card my={8} css={{ position: 'relative' }}>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoEl}
          width="100%"
          height="100%"
          css={{ display: 'block' }}
        />
        <ArrowsLeft
          color="green"
          width="56"
          height="32"
          css={{ position: 'absolute', top: '50%', right: 10, marginTop: -16 }}
        />
        <ArrowsRight
          color="green"
          width="56"
          height="32"
          css={{ position: 'absolute', top: '50%', left: 10, marginTop: -16 }}
        />
      </Card>
    </MobileApp>
  )
}
