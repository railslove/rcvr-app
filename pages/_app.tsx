import 'modern-normalize'
import 'typeface-nunito'
import '~lib/appReset.css'
import '~lib/polyfills'

import React from 'react'
import App, { AppContext } from 'next/app'
import { Global, ThemeProvider } from '@emotion/react'

import { AnimateSharedLayout } from 'framer-motion'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useA11yFocusRing } from '~lib/hooks'
import { theme, globalStyles } from '~ui/theme'
import { LocalesContextProvider } from '~locales/useLocaleContext'
import loadPageLocale from '~locales/loadPageLocale'
import { NextRouter } from 'next/router'
import { PageLocaleResource, SupportedLanguage } from '~locales/types'
import supportedBrowsers from '~lib/supportedBrowsers'
import { AppPropsType } from 'next/dist/shared/lib/utils'

const queryClient = new QueryClient()

export type RecoverAppProps = Omit<AppPropsType<NextRouter>, 'pageProps'> & {
  pageProps: {
    localeContext: {
      lang: string
      values: PageLocaleResource
      pageLocales: SupportedLanguage[]
    }
  }
}

export type RecoverAppFC = React.FC<RecoverAppProps> & {
  getInitialProps?: (
    appCtxt: AppContext
  ) => Promise<Pick<RecoverAppProps, 'pageProps'>>
}

const RecoverApp: RecoverAppFC = ({
  Component,
  pageProps: { localeContext, ...pageProps },
}) => {
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
        <LocalesContextProvider value={localeContext}>
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
  const { pageProps = {}, ...rest } = await App.getInitialProps(appCtxt)

  const localeContext =
    pageProps.localeContext || (await loadPageLocale(appCtxt.ctx))

  return {
    ...rest,
    pageProps: {
      ...pageProps,
      localeContext,
    },
  }
}

export default RecoverApp
