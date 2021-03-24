import 'modern-normalize'
import 'typeface-nunito'
import '~lib/appReset.css'

import * as React from 'react'
import { AppProps } from 'next/app'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { AnimateSharedLayout } from 'framer-motion'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import { useA11yFocusRing } from '~lib/hooks'
import { theme, globalStyles } from '~ui/theme'

Sentry.init({
  dsn:
    'https://69e03ca7d5ad4c22b01a1f0aa5480f78@o558100.ingest.sentry.io/5691155',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useA11yFocusRing()
  return (
    <Sentry.ErrorBoundary fallback={'Ein Fehler ist aufgetreten'}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <AnimateSharedLayout>
          <Component {...pageProps} />
        </AnimateSharedLayout>
      </ThemeProvider>
    </Sentry.ErrorBoundary>
  )
}

export default App
