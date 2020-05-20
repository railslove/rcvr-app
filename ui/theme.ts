import { css } from '@styled-system/css'
import * as pxToRem from '@lib/px-to-rem'

const theme = {
  space: pxToRem.withArray([0, 4, 8, 16, 32, 48, 64, 80]),
  sizes: pxToRem.withArray([0, 4, 8, 16, 32, 48, 64, 80]),
  borders: {
    card: '1px solid #DFEAEB',
    circle: '2px solid #000000',
    checkbox: '2px solid #000000',
    input: '1px solid #000000',
    activePage: '3px solid #28EE5F',
  },
  colors: {
    white: '#FFFFFF',
    bluegrey: {
      100: '#F8FAFB',
      300: '#DFEAEB',
      500: '#ADCDD0',
      800: '#6b878a',
    },
    black: '#000000',
    green: '#28EE5F',
    pink: '#EA28EE',
    yellow: '#EEC228',
    red: '#EE283F',
  },
  fonts: {
    body: 'Nunito, sans-serif',
  },
  fontSizes: pxToRem.withObject({
    xxs: 9,
    xs: 11,
    s: 13,
    md: 16,
    l: 21,
    xl: 32,
    xxl: 38,
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
  radii: {
    xl: '2.18rem',
    l: '1rem',
  },
}

const globalStyles = css({
  'body, html': {
    fontFamily: 'body',
    fontSize: 16, // baseline for rems
    minHeight: '100vh',
    scrollBehavior: 'smooth',
    textRendering: 'optimizeSpeed',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    fontWeight: 'semibold',
    bg: 'bluegrey.100',
  },
  a: {
    textDecorationSkipInk: 'auto',
    textDecoration: 'none',
  },
  '#__next': {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
})

export { theme, globalStyles }
