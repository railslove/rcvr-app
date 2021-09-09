const execSync = require('child_process').execSync
const { generateLocalesConfigAndTypes } = require('./locales/generate')

const localesDefaults = require('./locales/defaults.json')

module.exports = {
  /**
   * i18n support
   */
  i18n: {
    ...localesDefaults,
    defaultLocale:
      process.env.NODE_ENV === 'test' ? 'de' : localesDefaults.defaultLocale,
    localeDetection: false,
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
