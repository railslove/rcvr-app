import 'modern-normalize'
import 'typeface-nunito'
import '~lib/appReset.css'

import * as React from 'react'
import { AppProps } from 'next/app'
import { Global, ThemeProvider } from '@emotion/react'

import { AnimateSharedLayout } from 'framer-motion'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useA11yFocusRing } from '~lib/hooks'
import { theme, globalStyles } from '~ui/theme'

import TagManager from 'react-gtm-module'

const queryClient = new QueryClient()

const tagManagerArgs = {
  gtmId: 'G-HCM7KT2QBZ'
}

if (process.browser) {
  TagManager.initialize(tagManagerArgs);
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useA11yFocusRing()
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
