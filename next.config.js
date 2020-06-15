module.exports = {
  env: {
    apiBase: 'https://api.rcvr.app/',
  },
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
}
