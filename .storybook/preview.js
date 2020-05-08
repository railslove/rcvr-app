import 'modern-normalize'
import 'typeface-nunito'
import '@lib/app-reset.css'

import { addDecorator, addParameters } from '@storybook/react'
import { ThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'
import { theme, globalcss } from '@ui/theme'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

addDecorator((story) => (
  <ThemeProvider theme={theme}>
    <Global styles={globalcss} />
    {story()}
  </ThemeProvider>
))

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphonex',
  },
})

addParameters({
  backgrounds: [
    { name: 'white', value: theme.colors.white, default: true },
    { name: 'page', value: theme.colors.bluegrey[100] },
  ],
})
