/* eslint-disable jsx-a11y/media-has-caption */
import * as React from 'react'
import Head from 'next/head'
import { GuestApp } from '@ui/layouts/GuestApp'
import { Text, Card, Box } from '@ui/core'
import { ArrowsLeft, ArrowsRight } from '@ui/anicons/Arrows'

type QRCodePageProps = {}

const QRCodePage: React.FC<QRCodePageProps> = () => {
  React.useEffect(() => {
    const { BrowserQRCodeReader } = require('@zxing/library')
    const reader = new BrowserQRCodeReader()
    reader
      .decodeOnceFromVideoDevice(undefined, 'video')
      .then((result) => {
        window.location.href = result.text
      })
      .catch((err) => console.warn(err))
  }, [])

  return (
    <GuestApp logoVariant="big">
      <Head>
        <title key="title">QR-Code scannen | recover</title>
      </Head>
      <Text as="h2" variant="h2">
        QR-Code scannen
      </Text>
      <Box height={4} />
      <Text>
        Scanne den QR-Code, den Du auf dem Tisch teilnehmender Restaurants
        findest.
      </Text>
      <Card p={0} my={8} css={{ position: 'relative' }}>
        <video
          id="video"
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
    </GuestApp>
  )
}

export default QRCodePage
