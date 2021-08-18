const { execSync } = require('child_process')

execSync('mkdir -p locales/generated', { stdio: 'inherit' })

const { generateLocalesConfigAndTypes } = require('../locales/generate')

generateLocalesConfigAndTypes()
