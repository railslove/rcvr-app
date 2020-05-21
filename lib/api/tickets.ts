import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'
import { api, parseDates, stringifyDates } from './'

export interface TicketRes<DateT = Date> {
  id: string
  companyName: string
  enteredAt: DateT
  leftAt?: DateT
}

export interface TicketReq<DateT = Date> {
  id: string
  areaId?: string
  enteredAt?: DateT
  leftAt?: DateT
  encryptedData?: string
  publicKey?: string
}

export async function postTicket(ticket: TicketReq): Promise<TicketRes> {
  const json = snakecaseKeys(
    { ticket: stringifyDates(ticket, 'enteredAt', 'leftAt') },
    { deep: true }
  )

  return await api
    .post('tickets', { json })
    .json()
    .then((res: object) => camelcaseKeys(res, { deep: true }))
    .then((res: object) => parseDates<TicketRes>(res, 'enteredAt', 'leftAt'))
}

export async function patchTicket(ticket: TicketReq): Promise<TicketRes> {
  const { id, ...changes } = ticket
  const json = snakecaseKeys(
    { ticket: stringifyDates(changes, 'enteredAt', 'leftAt') },
    { deep: true }
  )

  return await api
    .patch(`tickets/${id}`, { json })
    .json()
    .then((res: object) => camelcaseKeys(res, { deep: true }))
    .then((res: object) => parseDates<TicketRes>(res, 'enteredAt', 'leftAt'))
}
