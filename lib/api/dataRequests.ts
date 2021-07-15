import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'
import { api, parseDates } from './'

export interface DataRequestRes<DateT = Date> {
  id: string
  reason: string
  irisClientName: string
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

export interface UnacceptedDataRequestsRes {
  [companyId: string]: DataRequestRes[]
}

interface UnacceptedDataRequestsReq {
  id: string
  name: string
  unacceptedDataRequests: DataRequestRes[]
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
        parseDates<DataRequestRes<string>, DataRequestRes>(
          dataRequest,
          'from',
          'to',
          'acceptedAt'
        )
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
        ...parseDates<DataRequestRes<string>, DataRequestRes>(
          res,
          'from',
          'to',
          'acceptedAt'
        ),
        tickets: res.tickets?.map((ticket) =>
          parseDates<DataRequestTicket<string>, DataRequestTicket>(
            ticket,
            'enteredAt',
            'leftAt'
          )
        ),
      }
    })
}

export async function postAutoDataRequest(reason: string, companyId: string) {
  const json = snakecaseKeys({ dataRequest: { reason } }, { deep: true })

  return await api
    .post(`companies/${companyId}/data_requests`, { json })
    .json()
    .then((res: DataRequestRes<string>) => camelcaseKeys(res, { deep: true }))
    .then((res) => {
      return {
        ...parseDates<DataRequestRes<string>, DataRequestRes>(
          res,
          'from',
          'to',
          'acceptedAt'
        ),
        tickets: res.tickets?.map((ticket) =>
          parseDates<DataRequestTicket<string>, DataRequestTicket>(
            ticket,
            'enteredAt',
            'leftAt'
          )
        ),
      }
    })
}

export async function postAcceptDataRequest(dataRequestId: string) {
  return await api
    .patch(`unaccepted_data_requests/${dataRequestId}/accept`, {})
    .json()
}

export async function getUnacceptedDataRequests() {
  return await api
    .get(`unaccepted_data_requests`, {})
    .json()
    .then((res) => camelcaseKeys(res, { deep: true }))
    .then((res: UnacceptedDataRequestsReq[]) =>
      res.reduce((obj, item) => {
        obj[item.id] = item.unacceptedDataRequests.map(
          (dataRequest: DataRequestRes) =>
            parseDates<DataRequestRes, string>(dataRequest, 'from', 'to', 'acceptedAt')
        )
        return obj
      }, {})
    )
}
