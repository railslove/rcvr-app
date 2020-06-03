import camelcaseKeys from 'camelcase-keys'
import { api, parseDates } from './'

export interface DataRequestRes<DateT = Date> {
  id: string
  from: DateT
  to: DateT
  acceptedAt: DateT
  tickets?: DataRequestTicket<DateT>[]
}

export interface DataRequestTicket<DateT = Date> {
  id: string
  enteredAt: DateT
  leftAt?: DateT
  areaId: string
  areaName: string
  companyName: string
  encryptedData: string
}

export async function getDataRequests(
  companyId: string
): Promise<DataRequestRes[]> {
  return await api
    .get(`companies/${companyId}/data_requests`)
    .json()
    .then((res) => camelcaseKeys(res, { deep: true }))
    .then((res: DataRequestRes<string>[]) => {
      return res.map((dataRequest) =>
        parseDates<DataRequestRes>(dataRequest, 'from', 'to', 'acceptedAt')
      )
    })
}

export async function getDataRequest(id: string): Promise<DataRequestRes> {
  return await api
    .get(`data_requests/${id}`)
    .json()
    .then((res: DataRequestRes<string>) => camelcaseKeys(res, { deep: true }))
    .then((res) => {
      return {
        ...parseDates<DataRequestRes>(res, 'from', 'to', 'acceptedAt'),
        tickets: res.tickets?.map((ticket) =>
          parseDates<DataRequestTicket>(ticket, 'enteredAt', 'leftAt')
        ),
      }
    })
}
