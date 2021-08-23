import 'modern-normalize'
import 'typeface-nunito'
import '~lib/appReset.css'
import '~lib/polyfills'

import React from 'react'
import { NextRouter } from 'next/router'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import App, { AppContext } from 'next/app'
import { AnimateSharedLayout } from 'framer-motion'
import { Global, ThemeProvider } from '@emotion/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import loadPageLocale from '~locales/loadPageLocale'
import { useA11yFocusRing } from '~lib/hooks'
import { LocalesContextProvider } from '~locales/useLocaleContext'
import { PageLocaleResource, SupportedLanguage } from '~locales/types'

import SupportedBrowsersAlert from '~ui/SupportedBrowsersAlert/SupportedBrowsersAlert'
import { theme, globalStyles } from '~ui/theme'

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

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <LocalesContextProvider value={localeContext}>
          <Global styles={globalStyles} />
          <AnimateSharedLayout>
            <SupportedBrowsersAlert />
            <Component {...pageProps} />
          </AnimateSharedLayout>
        </LocalesContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

RecoverApp.getInitialProps = async (value: AppContext) => {
  const { pageProps = {}, ...rest } = await App.getInitialProps(value)

  const localeContext =
    pageProps.localeContext || (await loadPageLocale(value.ctx))

  return {
    ...rest,
    pageProps: {
      ...pageProps,
      localeContext,
    },
  }
}

export default RecoverApp
