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
      <br />
      <p>Scanne den QR-Code mit deiner Kamera und du wirst auf die Checkin Seite weiter geleitet:</p>
      <br />
      <video id="video" width="100%" height="100%" />
    </AppLayout>
  )
}

export default QRCodePage
