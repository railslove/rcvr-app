import ky from 'ky-universal'

export * from './areas'
export * from './owner'
export * from './tickets'
export * from './companies'
export * from './dataRequests'

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

export function parseDates<T>(obj: object, ...keys: string[]): T {
  const objCopy = { ...obj }
  for (const key of keys) {
    if (objCopy[key]) objCopy[key] = Date.parse(objCopy[key])
  }
  return objCopy as T
}

export function stringifyDates(obj: object, ...keys: string[]): object {
  const objCopy = { ...obj }
  for (const key in keys) {
    if (objCopy[key]) objCopy[key] = objCopy[key].toISOString()
  }
  return objCopy
}
