module.exports = {
  env: {
    apiBase: 'http://172.16.0.90:3000/',
    stripePublishableKey: 'pk_test_Q2N3ljTzzBgxO4uOlsv5BS7u00f3eocyfC',
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
