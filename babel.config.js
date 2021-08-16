const { readFileSync } = require('fs')
const { join } = require('path')

const browsersList = readFileSync(
  join(__dirname, '.browserslistrc'),
  'utf8'
).split('\n')

module.exports = function (api) {
  api.cache(true)

  const presets = [
    'next/babel',
    [
      '@emotion/babel-preset-css-prop',
      {
        autoLabel: 'dev-only',
        labelFormat: '[local]',
        'preset-env': {
          targets: browsersList,
        },
      },
    ],
  ]
  const plugins = []

  return { presets, plugins }
}
