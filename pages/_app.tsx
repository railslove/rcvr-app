import 'modern-normalize'
import 'typeface-nunito'
import '~lib/appReset.css'

import * as React from 'react'
import { AppProps } from 'next/app'
import { I18nextProvider } from 'react-i18next'
import { Global, ThemeProvider } from '@emotion/react'

import { AnimateSharedLayout } from 'framer-motion'
import { QueryClient, QueryClientProvider } from 'react-query'

import i18n from '~locales/i18n'
import { useA11yFocusRing } from '~lib/hooks'
import { theme, globalStyles } from '~ui/theme'

const queryClient = new QueryClient()

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useA11yFocusRing()
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Global styles={globalStyles} />
        <AnimateSharedLayout>
          <I18nextProvider i18n={i18n}>
            <Component {...pageProps} />
          </I18nextProvider>
        </AnimateSharedLayout>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
