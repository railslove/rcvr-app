export const isCareEnv = process.env.NEXT_PUBLIC_BUILD_VARIANT === 'care'
export const isRcvrEnv = process.env.NEXT_PUBLIC_BUILD_VARIANT === 'rcvr'
export const isFreseniusEnv =
  process.env.NEXT_PUBLIC_BUILD_VARIANT === 'fresenius'
export const isHealthEnv = process.env.NEXT_PUBLIC_BUILD_VARIANT === 'health'
export const isFormal = isCareEnv || isHealthEnv
export const vercel_url = process.env.VERCEL_URL || ''
