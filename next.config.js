module.exports = {
  typescript: {
    ignoreDevErrors: true,
  },
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'de',
    localeDetection: true,
  },
  pageExtensions: ['tsx'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}
