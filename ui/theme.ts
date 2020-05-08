import { css } from '@styled-system/css'
import * as pxToRem from '@lib/px-to-rem'

const theme = {
  space: pxToRem.withArray([0, 4, 8, 16, 32, 64]),
  colors: {
    white: '#FFFFFF',
    bluegrey: {
      100: '#E5E5E5',
      500: '#ADCDD0',
    },
    black: '#000000',
  },
  fonts: {
    body: 'Nunito',
  },
  fontSizes: pxToRem.withObject({
    md: 16,
  }),
  fontWeights: {
    xlight: 200,
    light: 300,
    regular: 400,
    semibold: 600,
    bold: 700,
    xbold: 800,
    black: 900,
  },
}

// shared with app + storybook
const globalcss = css({
  'body, html': {
    fontFamily: 'body',
    fontSize: 16, // baseline for rems
    minHeight: '100vh',
    scrollBehavior: 'smooth',
    textRendering: 'optimizeSpeed',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    overscrollBehavior: 'none', // remove overscroll to make to app more app-y
  },
  a: {
    textDecorationSkipInk: 'auto',
  },
})

// only for app
const pagecss = css({
  'body, html': {
    bg: 'bluegrey.100',
  },
})

export { theme, globalcss, pagecss }
