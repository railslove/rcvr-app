const nextTranslate = require('next-translate')

module.exports = nextTranslate({
  typescript: {
    ignoreDevErrors: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
})
