const execSync = require('child_process').execSync

module.exports = {
  typescript: {
    ignoreDevErrors: true,
  },
  webpack: (config) => {
    execSync('npm run update-supported-browsers')

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}
