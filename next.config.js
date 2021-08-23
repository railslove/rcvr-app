const execSync = require('child_process').execSync
const { generateLocalesConfigAndTypes } = require('./locales/generate')

const localesDefaults = require('./locales/config.json')

module.exports = {
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
  },
  /**
   * i18n support
   */
  i18n: {
    ...localesDefaults,
    localeDetection: true,
  },
  // needed to place locales under pages/ next to the page to be translated
  pageExtensions: ['tsx'],

  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    if (isServer) {
      execSync('npm run update-supported-browsers')
      generateLocalesConfigAndTypes()
    }

    return config
  },
}
