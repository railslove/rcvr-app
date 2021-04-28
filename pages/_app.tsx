import 'modern-normalize'
import 'typeface-nunito'
import '~lib/appReset.css'

import * as React from 'react'
import { AppProps } from 'next/app'
import { Global, ThemeProvider } from '@emotion/react'

import { AnimateSharedLayout } from 'framer-motion'

import { useA11yFocusRing } from '~lib/hooks'
import { theme, globalStyles } from '~ui/theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useA11yFocusRing()
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <AnimateSharedLayout>
        <Component {...pageProps} />
      </AnimateSharedLayout>
    </ThemeProvider>
  )
}

export default App
