const execSync = require('child_process').execSync
const { generateLocalesConfigAndTypes } = require('./locales/generate')

const i18n = require('./locales/defaults')

module.exports = {
  /**
   * i18n support
   */
  i18n,
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
