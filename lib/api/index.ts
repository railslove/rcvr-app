import ky from 'ky-universal'

export * from './areas'
export * from './owner'
export * from './tickets'
export * from './companies'
export * from './dataRequests'
export * from './passwords'

console.log('API-URL:' + process.env.NEXT_PUBLIC_API_BASE)
export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE,
  timeout: false,
  hooks: {
    beforeRequest: [
      (request) => {
        const protectedPaths = [
          '/owner',
          '/companies',
          '/areas',
          '/data_requests',
          '/unaccepted_data_requests',
          '/checkout',
          '/setup_intent',
          '/sepa_subscription',
          '/subscription-settings',
        ]
        const shouldSetToken = protectedPaths.some((path) =>
          request.url.includes(path)
        )
        const token = localStorage.getItem('rcvr_olt')

        if (shouldSetToken && token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
    afterResponse: [
      (_request, _options, response) => {
        const authHeader = response.headers.get('Authorization')
        if (authHeader) {
          const token = authHeader.replace('Bearer ', '')
          localStorage.setItem('rcvr_olt', token)
        }

        return response
      },
    ],
  },
})

export function parseDates<K, T>(obj: K, ...keys: string[]): T {
  const objCopy = { ...obj }
  for (const key of keys) {
    if (objCopy[key]) {
      objCopy[key] = new Date(Date.parse(objCopy[key] as string))
    }
  }
  return objCopy as unknown as T
}

export function stringifyDates<K, T>(obj: K, ...keys: string[]): T {
  const objCopy = { ...obj }
  for (const key in keys) {
    if (objCopy[key]) objCopy[key] = (objCopy[key] as Date).toISOString()
  }
  return objCopy as unknown as T
}
