module.exports = {
  typescript: {
    ignoreDevErrors: true,
  },
  pageExtensions: ['.tsx'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}
