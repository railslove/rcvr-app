/* eslint-disable @typescript-eslint/explicit-function-return-type */

module.exports = function (api) {
  api.cache(true)

  const presets = [
    'next/babel',
    [
      '@emotion/babel-preset-css-prop',
      {
        autoLabel: true,
        labelFormat: '[local]',
      },
    ],
  ]
  const plugins = []

  return { presets, plugins }
}
