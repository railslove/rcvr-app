/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/media-has-caption */
import * as React from 'react'
import Head from 'next/head'
import AppLayout from '@ui/layouts/App'
import { Text, Box } from '@ui/base'

const QRCodePage: React.FC<{}> = () => {
  React.useEffect(() => {
    const launchBrowserQRCodeReader = async (): Promise<void> => {
      const { BrowserQRCodeReader } = require('@zxing/library')
      const codeReader = new BrowserQRCodeReader()

      codeReader
        .decodeOnceFromVideoDevice(undefined, 'video')
        .then((result: { text: any }) => {
          window.location.href = result.text
        })
        .catch((err: any) => console.error(err))
    }

    launchBrowserQRCodeReader()
  }, [])

  return (
    <AppLayout sticky={false}>
      <Head>
        <title key="title">QR-Code scannen | recover</title>
      </Head>
      <Box px={4}>
        <Text as="h1" size="l" mt={3} mb={5}>
          QR-Code scannen
        </Text>
        <Text size="s" fontWeight="bold" mb={4}>
          Halte einfach deine Kamera auf den QR-Code und wir checken dich ein.
        </Text>
      </Box>
      <video id="video" width="100%" height="100%" />
    </AppLayout>
  )
}

export default QRCodePage
