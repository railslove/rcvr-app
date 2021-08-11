/**
 * generates config and types of locales
 * NOTE: used after build in next.config.js => keep require inside this function
 */
function generateLocalesConfig() {
  const fs = require('fs')
  const glob = require('glob')

  const config = glob
    .sync('pages/**/*.tsx')
    .map((el) => el.replace(/^pages\/|\.tsx$/g, ''))
    .filter((el) => el === '_error' || !/^_/.test(el))
    .reduce(
      (acc, el) => {
        const url = `/${
          el === 'index'
            ? ''
            : /\/index$/.test(el)
            ? el.replace(/\/index$/, '')
            : el
        }`

        return {
          ...acc,
          pages: {
            ...acc.pages,
            [url]: [el],
          },
          namespaces: acc.namespaces.concat(el),
        }
      },
      {
        pages: {},
        namespaces: [],
      }
    )

  const LocalesResources = config.namespaces
    .slice()
    .sort((a, b) => {
      return (a.length > b.length && 1) || (a.length < b.length && -1) || 0
    })
    .reduce((acc, el) => {
      return {
        ...acc,
        [el]: `typeof import('../pages/${el}.de').default`,
      }
    }, {})

  const LocalesResourcesType = 'LocalesResources'
  const LocalesResourcesString = JSON.stringify(LocalesResources, null, 2)
    .replace(/"typeof/g, 'typeof')
    .replace(/\.default",?/g, '.default')
    .replace(/"(\S+)":/g, "'$1':")
    .replace(/'([^0-9-/\s]+)':/g, '$1:')

  fs.writeFileSync('locales/config.json', JSON.stringify(config, null, 2))

  fs.writeFileSync(
    'locales/LocalesResources.d.ts',
    [
      `type ${LocalesResourcesType} = ${LocalesResourcesString}\n`,
      `export default ${LocalesResourcesType}`,
      '',
    ].join('\n')
  )
}

exports = module.exports = {
  generateLocalesConfig,
}
