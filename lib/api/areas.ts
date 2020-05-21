import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'
import { api, parseDates, CompanyRes, CompanyReq } from './'

export interface AreaReq {
  name: string
  companyId: CompanyRes['id']
}

export interface AreaRes {
  id: string
  name: string
  companyId: string
  menuLink?: string
}

export async function getArea(id: AreaRes['id']): Promise<AreaRes> {
  return await api
    .get(`areas/${id}`)
    .json()
    .then((res: AreaRes) => camelcaseKeys(res, { deep: true }))
}

export async function postArea(area: AreaReq): Promise<AreaRes> {
  const { companyId, ...changes } = area
  const json = snakecaseKeys({ area: changes }, { deep: true })

  return await api
    .post(`companies/${companyId}/areas`, { json })
    .json()
    .then((res: AreaRes) => camelcaseKeys(res, { deep: true }))
}

interface AreaTicket<DateT = Date> {
  id: string
  enteredAt: DateT
  leftAt?: DateT
  areaId: string
  companyName: string
  areaName: string
}

interface GetTicketParams {
  from: Date
  to: Date
  companyId: CompanyReq['id']
}

export async function getTickets(params: GetTicketParams): Promise<AreaTicket> {
  return await api
    .get(`companies/${params.companyId}/tickets`, {
      searchParams: {
        from: params.from.toISOString(),
        to: params.to.toISOString(),
      },
    })
    .json()
    .then((res: object) => camelcaseKeys(res, { deep: true }))
    .then((res: object) => parseDates<AreaTicket>(res, 'enteredAt', 'leftAt'))
}
