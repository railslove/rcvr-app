const execSync = require('child_process').execSync

const isCareBranch =
  process.env.VERCEL_GITHUB_COMMIT_REF &&
  process.env.VERCEL_GITHUB_COMMIT_REF.startsWith('care/')
const isCareDomain = process.env.VERCEL_URL === 'care.rcvr.app'

if (isCareBranch || isCareDomain) {
  process.env.BUILD_VARIANT = 'care'
}

execSync('npm run next-build', { stdio: 'inherit' })
