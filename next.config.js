const nextTranslate = require('next-translate')
const localesDefaults = require('./locales/config.defaults.json')
const { generateLocalesConfig } = require('./locales/build')

module.exports = nextTranslate({
  typescript: {
    ignoreDevErrors: true,
  },
  i18n: {
    ...localesDefaults,
    localeDetection: true,
  },
  pageExtensions: ['tsx'],
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    if (isServer) {
      generateLocalesConfig()
    }

    return config
  },
})
