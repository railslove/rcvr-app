import * as React from 'react'
import { NextPageContext, NextPage } from 'next'
import { detect as detectBrowser, BrowserInfo } from 'detect-browser'
import Link from 'next/link'

import { Text, Box, Card, Button } from '~ui/core'
import { ArrowsRight, ArrowsLeft } from '~ui/anicons'
import { MobileApp } from '~ui/layouts/MobileApp'

export type ErrorProps = {
  statusCode: number
  error?: Error
}

function DefaultError() {
  return (
    <Text>
      <p>Tut uns leid, es ist zu einem unerwarteten Fehler gekommen.</p>
    </Text>
  )
}

function InvalidPubkeyEncoding() {
  return (
    <>
      <Text>
        <p>
          <strong>
            Scheinbar funktioniert dein QR-Code Scanner nicht korrekt.
          </strong>
        </p>
        <p>
          Die meisten Handykameras können QR-Codes ohne eine zusätzliche App
          scannen. Oder nutze unseren QR-Code Scanner:
        </p>
      </Text>
      <Box height={6} />
      <Link href="/qr" passHref>
        <Button
          as="a"
          left={<ArrowsRight color="green" />}
          right={<ArrowsLeft color="green" />}
        >
          QR-Code scannen
        </Button>
      </Link>
    </>
  )
}

const errorMappings = {
  10010: InvalidPubkeyEncoding,
}

const Error: NextPage<ErrorProps> = ({ statusCode, error }) => {
  const [browser, setBrowser] = React.useState<BrowserInfo>()
  React.useEffect(() => {
    const result = detectBrowser()
    if (result.type === 'browser') setBrowser(result)
  }, [])

  const ErrorDetails = React.useMemo(() => {
    return errorMappings[statusCode] || DefaultError
  }, [statusCode])

  return (
    <MobileApp logoVariant="big">
      <Text variant="h3" as="h1" color="red.500">
        Das hat leider nicht funktioniert...
      </Text>
      <Box height={4} />
      <ErrorDetails />
      <Box height={6} />
      <Card mx={-4} p={6}>
        <Text>
          <p>
            Im Sinne der Datensparsamkeit werden Fehler nicht automatisch an uns
            übermittelt.
          </p>
          <p>
            Wenn Du glaubst, dass dieser Fehler nicht hätte passieren sollen,
            oder du diesen Fehler öfter siehst, schreib uns bitte eine Mail an{' '}
            <a href="mailto:team@recoverapp.de">team@recoverapp.de</a>.
          </p>
          <p>
            Damit wir dir besser helfen können, schicke uns außerdem folgende
            Fehlerdetails:
          </p>
        </Text>
        <Box height={4} />
        <Text fontFamily="monospace" color="bluegrey.500" fontSize="xs">
          <p>
            code:{statusCode},error:{error?.toString()},{browser?.os},
            {browser?.name},{browser?.version}
          </p>
        </Text>
      </Card>
    </MobileApp>
  )
}

function normalizePath(path: string): string {
  return path
    .replace(/\/+$/, '')
    .replace(/\/+#/, '#')
    .replace(/\/+\?/, '?')
    .replace(/\/+/g, '/')
}

Error.getInitialProps = async (ctx: NextPageContext): Promise<ErrorProps> => {
  const { req, res, err } = ctx
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404

  if (typeof window === 'undefined') {
    /**
     * Redirect trailing slashes to non-trailing slashes
     * Workaround for: https://github.com/zeit/next.js/issues/8913#issuecomment-537632531
     * Test vectors:
     * `/test/test/` -> `/test/test`
     * `/test/////test////` -> `/test/test`
     * `/test//test//?a=1&b=2` -> `/test?a=1&b=2`
     * `/test///#test` -> `/test#test`
     */
    const normalizedPath = normalizePath(req.url)
    if (req && res && req.url && normalizedPath !== req.url) {
      res.writeHead(302, { Location: normalizedPath })
      res.end()
    }
  }

  return { statusCode, error: err }
}

export default Error
