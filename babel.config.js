module.exports = function (api) {
  api.cache(true)

  const presets = [
    'next/babel',
    [
      '@emotion/babel-preset-css-prop',
      {
        autoLabel: 'dev-only',
        labelFormat: '[local]',
      },
    ],
  ]
  const plugins = []

  return { presets, plugins }
}
