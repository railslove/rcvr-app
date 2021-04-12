import Head from 'next/head'
import * as React from 'react'
import { isFormal } from '~lib/config'
import { ArrowsLeft, ArrowsRight } from '~ui/anicons'
import { Box, Card, Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'

export default function QRCodePage() {
  const videoEl = React.useRef<HTMLVideoElement>()

  function appendUrlParams(url: string): any {
    const params = new URLSearchParams(new URL(window.location.href).search)
    const qrUrl = new URL(url)

    for (const [key, value] of params.entries()) {
      qrUrl.searchParams.append(key, value)
    }
    return qrUrl.toString()
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
        window.location.href = appendUrlParams(result.getText())
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
