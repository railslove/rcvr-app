import 'modern-normalize'
import 'typeface-nunito'
import '~lib/appReset.css'
import '~lib/polyfills'

import * as React from 'react'
import { AppProps } from 'next/app'
import { Global, ThemeProvider } from '@emotion/react'

import { AnimateSharedLayout } from 'framer-motion'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useA11yFocusRing } from '~lib/hooks'
import { theme, globalStyles } from '~ui/theme'
import supportedBrowsers from '~lib/supportedBrowsers'

const queryClient = new QueryClient()

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useA11yFocusRing()

  if (
    typeof navigator != 'undefined' &&
    !supportedBrowsers.test(navigator.userAgent)
  ) {
    alert(
      'Ihr Browser wird nicht unterstützt. Die Seite wird eventuell nicht funktionieren.'
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Global styles={globalStyles} />
        <AnimateSharedLayout>
          <Component {...pageProps} />
        </AnimateSharedLayout>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
