const config = require('./locales/config.json')
const configDefaults = require('./locales/config.defaults.json')

exports = module.exports = {
  ...configDefaults,
  ...config,

  loadLocaleFrom(lang, ns) {
    return import(`pages/${ns}.${lang}.ts`).then((m) => {
      const result = m.default
      console.log('locale', ns, lang, result)
      return result
    })
  },
}
