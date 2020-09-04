export const isCareEnv = process.env.NEXT_PUBLIC_BUILD_VARIANT === 'care'
export const isRcvrEnv = process.env.NEXT_PUBLIC_BUILD_VARIANT === 'rcvr'
export const isFreseniusEnv =
  process.env.VERCEL_URL.includes('fresenius') ||
  process.env.NEXT_PUBLIC_BUILD_VARIANT === 'fresenius'
