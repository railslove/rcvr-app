const config = require('./locales/generated/config.json')
const configDefaults = require('./locales/config.defaults.json')

exports = module.exports = {
  ...configDefaults,
  ...config,

  loadLocaleFrom(lang, ns) {
    console.log('loading', lang, ns)
    return import(`${ns}.${lang}.ts`).then((m) => {
      const result = m.default
      return result
    })
  },
}
