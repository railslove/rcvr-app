import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'
import { api, parseDates, stringifyDates } from './'

export interface TicketRes<DateT = Date> {
  id: string
  companyName: string
  companyLocationType: string
  companyAddress: string
  companyCwaUrl: any
  companyAutoCheckoutTime: number
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
  proxyCheckin?: boolean
}

export async function postTicket(ticket: TicketReq): Promise<TicketRes> {
  const json = snakecaseKeys(
    {
      ticket: stringifyDates<TicketReq, TicketReq<string>>(
        ticket,
        'enteredAt',
        'leftAt'
      ),
    },
    { deep: true }
  )

  return await api
    .post('tickets', { json })
    .json()
    .then(
      (res: unknown): TicketRes<string> =>
        camelcaseKeys(res, { deep: true }) as TicketRes<string>
    )
    .then((res: TicketRes<string>) =>
      parseDates<TicketRes<string>, TicketRes>(res, 'enteredAt', 'leftAt')
    )
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
    .then((res: unknown) => camelcaseKeys(res, { deep: true }))
    .then((res: TicketRes<string>) =>
      parseDates<TicketRes<string>, TicketRes>(res, 'enteredAt', 'leftAt')
    )
}

export interface CompanyTicketRes<DateT = Date> {
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
  companyId: string
}

export async function getTickets(
  params: GetTicketParams
): Promise<CompanyTicketRes[]> {
  return await api
    .get(`companies/${params.companyId}/tickets`, {
      searchParams: {
        from: params.from.toISOString(),
        to: params.to.toISOString(),
      },
    })
    .json()
    .then((res: unknown) => camelcaseKeys(res, { deep: true }))
    .then((res: CompanyTicketRes<string>[]) => {
      return res.map((ticket) => parseDates(ticket, 'enteredAt', 'leftAt'))
    })
}
