import 'modern-normalize'
import 'typeface-nunito'
import '~lib/appReset.css'
import '~lib/polyfills'

import React, { ComponentType } from 'react'
import App, { AppContext } from 'next/app'
import { Global, ThemeProvider } from '@emotion/react'

import { AnimateSharedLayout } from 'framer-motion'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useA11yFocusRing } from '~lib/hooks'
import { theme, globalStyles } from '~ui/theme'
import { LocalesContextProvider } from '~locales/useLocaleContext'
import loadLocale from '~locales/loadLocale'
import { NextRouter } from 'next/router'
import { PageLocaleResource } from '~locales/types'
import supportedBrowsers from '~lib/supportedBrowsers'
import { AppPropsType } from 'next/dist/shared/lib/utils'

const queryClient = new QueryClient()

export type RecoverAppProps = {
  localeContext: {
    lang: string
    values: PageLocaleResource
  }
}

export type RecoverAppType = ComponentType<
  AppPropsType<NextRouter, RecoverAppProps>
> & {
  getInitialProps?: (appCtxt: AppContext) => Promise<any>
}

const RecoverApp: RecoverAppType = ({ Component, pageProps }) => {
  useA11yFocusRing()

  if (
    typeof navigator != 'undefined' &&
    !supportedBrowsers.test(navigator.userAgent)
  ) {
    alert(
      'Sorry, dein Browser unterstützt recover nicht. Wenn ein Update nicht hilft, probiere einen anderen Browser.\n\n' +
        'Sorry, your browser does not support recover. If updating doesn’t help, please try another browser.'
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <LocalesContextProvider value={pageProps.localeContext}>
          <Global styles={globalStyles} />
          <AnimateSharedLayout>
            <Component {...pageProps} />
          </AnimateSharedLayout>
        </LocalesContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

RecoverApp.getInitialProps = async (appCtxt: AppContext) => {
  const { pageProps, ...rest } = await App.getInitialProps(appCtxt)

  const localeContext = await loadLocale(appCtxt.ctx)

  return {
    ...rest,
    pageProps: {
      localeContext,
      ...pageProps,
    },
  }
}

export default RecoverApp
