import * as React from 'react'
import { AppProps } from 'next/app'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { AnimateSharedLayout } from 'framer-motion'
import { useA11yFocusRing } from '@lib/hooks/useA11yFocusRing'
import { theme, globalStyles } from '@ui/theme'

import 'modern-normalize'
import 'typeface-nunito'
import '@lib/appReset.css'

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
