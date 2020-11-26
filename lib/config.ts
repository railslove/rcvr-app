export const isCareEnv = process.env.NEXT_PUBLIC_BUILD_VARIANT === 'care'
export const isRcvrEnv = process.env.NEXT_PUBLIC_BUILD_VARIANT === 'rcvr'
export const isFreseniusEnv =
  process.env.NEXT_PUBLIC_BUILD_VARIANT === 'fresenius'
export const isHealthEnv = process.env.NEXT_PUBLIC_BUILD_VARIANT === 'health'
export const isFormal = isCareEnv || isHealthEnv
export const getAffiliate = () => {
  // not using BUILD_VARIANT here to not introduce (potentially) unexpected implicit dependencies
  if (isHealthEnv) {
    return 'health'
  } else if (isCareEnv) {
    return 'care'
  } else {
    return localStorage.getItem('rcvr_affiliate')
  }
}
