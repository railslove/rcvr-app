const execSync = require('child_process').execSync

const isCareDomain = process.env.VERCEL_URL === 'care.rcvr.app'
const isCareBranch =
  process.env.VERCEL_GITHUB_COMMIT_REF &&
  process.env.VERCEL_GITHUB_COMMIT_REF.startsWith('care/')

if (isCareBranch || isCareDomain) {
  console.log('Using BUILD_VARIANT: care')
  process.env.BUILD_VARIANT = 'care'
} else {
  console.log('No automatic BUILD_VARIANT detected. Using default from .env')
}

execSync('npm run next-build', { stdio: 'inherit' })
