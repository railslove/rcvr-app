import { css } from '@styled-system/css'
import { isCareEnv } from '~lib/config'

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
  breakpoints: ['30em', '48em', '64em'],
  colors: {
    white: '#FFFFFF',
    bluegrey: {
      10: '#f5f8fa',
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
    green: isCareEnv ? '#4DB6AC' : '#28EE5F',
    pink: '#EA28EE',
    yellow: {
      50: '#fff8dc',
      100: '#faebb2',
      200: '#f6dd86',
      300: '#f2d058',
      400: '#eec32a',
      500: '#d5a911',
      600: '#a58409',
      700: '#765e04',
      800: '#483800',
      900: '#1b1300',
    },
    red: {
      50: '#ffe3e8',
      100: '#feb6bf',
      200: '#f88894',
      300: '#f3596b',
      400: '#ee2a41',
      500: '#d51128',
      600: '#a60a1e',
      700: '#770515',
      800: '#4a010b',
      900: '#1f0001',
    },
    blue: {
      50: '#e4f4ff',
      100: '#c3ddee',
      200: '#9fc8df',
      300: '#7bacd1',
      400: '#588dc4',
      500: '#3f6daa',
      600: '#304f85',
      700: '#203460',
      800: '#0e1a3b',
      900: '#000518',
    },
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
  'body.no-scroll': {
    overflow: 'hidden',
  },
})

export { theme, globalStyles }
