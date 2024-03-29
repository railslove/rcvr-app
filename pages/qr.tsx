import * as React from 'react'
import { ArrowsLeft, ArrowsRight } from '~ui/anicons'
import { Box, Card, Text } from '~ui/core'
import { MobileApp } from '~ui/layouts/MobileApp'

import usePageLocale from '~locales/usePageLocale'

export default function QRCodePage() {
  const { t } = usePageLocale('qr')
  const videoEl = React.useRef<HTMLVideoElement>()

  function appendUrlParams(url: URL): any {
    const params = new URLSearchParams(new URL(window.location.href).search)

    for (const [key, value] of params.entries()) {
      url.searchParams.append(key, value)
    }
    return url.toString()
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
        const qrUrl = new URL(result.getText())
        if (qrUrl.hostname === window.location.hostname) {
          window.location.href = appendUrlParams(qrUrl)
        } else {
          const message = [
            t('invalidQRCode1'),
            qrUrl.hostname,
            t('invalidQRCode2'),
          ].join('')

          if (confirm(message)) {
            window.location.href = appendUrlParams(qrUrl)
          }
        }
      } catch (error) {
        console.error('Failed mountAndWaitForScan:', error)
      }
    }

    mountAndWaitForScan()

    return () => qrCodeReader?.reset()
  })

  return (
    <MobileApp pageTitle={t('pageTitle')} logoVariant="big">
      <Text as="h2" variant="h2">
        {t('scanCode')}
      </Text>
      <Box height={4} />
      <Text>{t('scanCodeArea')}</Text>
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
