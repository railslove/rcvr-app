const execSync = require('child_process').execSync

const isCareFeatureBranch =
  process.env.VERCEL_GITHUB_COMMIT_REF &&
  process.env.VERCEL_GITHUB_COMMIT_REF.startsWith('care/')
const isCareEnvBranch =
  process.env.VERCEL_GITHUB_COMMIT_REF &&
  process.env.VERCEL_GITHUB_COMMIT_REF === 'env/care'

if (isCareFeatureBranch || isCareEnvBranch) {
  console.log('Using BUILD_VARIANT: care')
  process.env.BUILD_VARIANT = 'care'
} else {
  console.log('No automatic BUILD_VARIANT detected. Using default from .env')
}

execSync('npm run next-build', { stdio: 'inherit' })
