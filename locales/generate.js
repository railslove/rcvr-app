const {
  defaultLocale,
  locales: supportedLanguages,
} = require('./defaults.json')

/**
 *
 * @param {object} value
 * @returns {string}
 */
function serializeLocale(value) {
  return JSON.stringify(value, null, 2)
    .replace(/"typeof/g, 'typeof')
    .replace(/\.default",?/g, '.default')
    .replace(/"(\S+)":/g, "'$1':")
}

/**
 * generates config and types of locales
 * NOTE: used after build in next.config.js => keep require inside this function
 */
function generateLocalesConfigAndTypes() {
  const fs = require('fs')
  const glob = require('glob')
  const { execSync } = require('child_process')

  execSync('mkdir -p locales/generated', { stdio: 'inherit' })

  // get all translation files
  const config = glob
    .sync('pages/**/*.ts')
    .map((el) => el.replace(/^pages\/|\.tsx$/g, ''))
    .filter((el) => /^_error\./.test(el) || !/^_/.test(el))
    .reduce(
      (acc, el) => {
        const [pathname, lang] = el.split('.')

        if (lang == null) {
          return acc
        }

        const url = `/${
          /^index/.test(pathname)
            ? ''
            : /\/index$/.test(pathname)
            ? pathname.replace(/\/index$/, '')
            : pathname
        }`

        const page = acc.pages[url] || {}
        const locales = page.locales || [defaultLocale]

        return {
          ...acc,
          pages: {
            ...acc.pages,
            [url]: {
              locales:
                lang == null ||
                !supportedLanguages.includes(lang) ||
                locales.includes(lang)
                  ? locales
                  : locales.concat(lang).sort(),
              namespace: pathname,
            },
          },
          namespaces: acc.namespaces.includes(pathname)
            ? acc.namespaces
            : acc.namespaces.concat(pathname),
        }
      },
      {
        pages: {},
        namespaces: [],
      }
    )

  const PageLocalesResources = config.namespaces
    .slice()
    .sort((a, b) => {
      return (a.length > b.length && 1) || (a.length < b.length && -1) || 0
    })
    .reduce((acc, el) => {
      return {
        ...acc,
        [el]: `typeof import('../../pages/${el}.de').default`,
      }
    }, {})

  fs.writeFileSync(
    'locales/generated/config.json',
    JSON.stringify(config.pages, null, 2)
  )

  fs.writeFileSync(
    'locales/generated/types.d.ts',
    [
      `export type PageLocalesResources = ${serializeLocale(
        PageLocalesResources
      )}`,
      '',
    ].join('\n')
  )
}

exports = module.exports = {
  generateLocalesConfigAndTypes,
}
