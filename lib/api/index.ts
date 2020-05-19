import ky from 'ky/umd'

export * from './areas'
export * from './owner'
export * from './tickets'
export * from './companies'

export const api = ky.create({
  prefixUrl: process.env.apiBase,
  timeout: false,
  hooks: {
    beforeRequest: [
      (request) => {
        const protectedPaths = ['/signup', '/login', '/owner']
        const shouldSetToken = protectedPaths.includes(request.url)
        const token = sessionStorage.getItem('rcvr_olt')

        if (shouldSetToken && token) {
          request.headers.set('Authorization', token)
        }
      },
    ],
    afterResponse: [
      (_request, _options, response) => {
        const authHeader = response.headers.get('Authorization')
        if (authHeader) {
          const token = authHeader.replace('Bearer ', '')
          sessionStorage.setItem('rcvr_olt', token)
        }

        return response
      },
    ],
  },
})

export function parseDates<T>(obj: object, ...keys: string[]): T {
  const objCopy = { ...obj }
  for (const key in keys) {
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
