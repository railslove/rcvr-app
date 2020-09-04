export const isCareEnv = process.env.NEXT_PUBLIC_VERCEL_URL.includes('care')
export const isFreseniusEnv = process.env.NEXT_PUBLIC_VERCEL_URL.includes(
  'fresenius'
)
export const isRcvrEnv = !isCareEnv && !isFreseniusEnv

const buildEnv = ((): string => {
  if (isCareEnv) {
    return 'care'
  } else if (isFreseniusEnv) {
    return 'fresenius'
  }

  return 'rcvr'
})()

export { buildEnv }
