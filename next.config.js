const nextTranslate = require('next-translate')

module.exports = nextTranslate({
  typescript: {
    ignoreDevErrors: true,
  },
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en', 'pl'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
})
