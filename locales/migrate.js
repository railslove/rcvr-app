const path = require('path')
const glob = require('glob')
const { execSync } = require('child_process')

glob('pages/**/*.{de,en,pl}.ts', function (err, matches) {
  if (err) {
    throw err
  }

  const features = matches.map((el) => {
    const dirname = el.replace(/^pages\//, '')

    const [name, ...rest] = dirname.replace(/\//g, '-').split('.')

    return {
      src: el,
      dst: `locales/${name}/${rest.join('.')}`,
    }
  })

  features.forEach((el) => {
    execSync(`mkdir -p ${path.dirname(el.dst)}`, { stdio: 'inherit' })
    execSync(`cat ${el.src} > ${el.dst}`, { stdio: 'inherit' })
  })
})
