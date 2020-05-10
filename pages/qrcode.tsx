/* eslint-disable jsx-a11y/media-has-caption */
import * as React from 'react'
import AppLayout from '@ui/layouts/App'

const QRCodePage: React.FC<{}> = () => {
  React.useEffect(() => {
    const launchBrowserQRCodeReader = async () => {
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
    <AppLayout>
      <h1>QRCode</h1>
      <video id="video" width="300" height="200" />
    </AppLayout>
  )
}

export default QRCodePage
