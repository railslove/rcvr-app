import { css } from '@styled-system/css'

const sizes = {
  px: 1,
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
  40: 160,
  48: 192,
  56: 224,
  64: 256,
}

const theme = {
  sizes,
  space: sizes,
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
      50: '#eff3f6',
      100: '#d4dbdf',
      200: '#b7c3ca',
      300: '#98acb6',
      400: '#7a95a3',
      500: '#617b8a',
      600: '#4c606b',
      700: '#37454b',
      800: '#21292e',
      900: '#090e10',
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
  fontSizes: {
    xxs: 9,
    xs: 11,
    sm: 14,
    md: 16,
    lg: 21,
    xl: 32,
    xxl: 38,
  },
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
    bg: 'bluegrey.50',
  },
  a: {
    color: 'inherit',
    textDecorationSkipInk: 'auto',
    textDecoration: 'none',
  },
  '#__next': {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  'body:not(.user-is-tabbing)': {
    'button:focus, input:focus, select:focus, textarea:focus': {
      outline: 'none',
    },
  },
})

export { theme, globalStyles }
