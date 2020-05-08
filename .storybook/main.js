const path = require('path')

module.exports = {
  stories: ['../ui/**/__stories__/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs/register',
    'storybook-dark-mode/register',
    '@storybook/addon-viewport/register',
    '@storybook/addon-backgrounds/register',
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            configFile: path.resolve(__dirname, './tsconfig.json'),
          },
        },
      ],
    })
    config.resolve.extensions.push('.ts', '.tsx')
    config.resolve.alias = {
      '@ui': path.resolve(__dirname, '../ui'),
      '@lib': path.resolve(__dirname, '../lib'),
    }
    return config
  },
}
