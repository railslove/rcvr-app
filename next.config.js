module.exports = {
  env: {
    apiBase: 'http://172.16.0.90:3000/',
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
