const withImages = require('next-images')

const localesDefaults = require('./locales/config.defaults.json')
const { generateLocalesConfigAndTypes } = require('./locales/generate')

generateLocalesConfigAndTypes()

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

  /**
   * rest
   */
  typescript: {
    ignoreDevErrors: true,
  },

  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
})
