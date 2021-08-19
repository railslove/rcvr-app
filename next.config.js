const execSync = require('child_process').execSync
const { generateLocalesConfigAndTypes } = require('./locales/generate')

const withImages = require('next-images')
const localesDefaults = require('./locales/config.defaults.json')

module.exports = withImages({
  /**
   * next-images
   */
  fileExtensions: ['jpg', 'jpeg', 'png', 'gif'],
  /**
   * next-translate
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
})
