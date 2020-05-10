import { seal } from 'tweetnacl-sealedbox-js'
import * as db from '@lib/db'
import ky from 'ky/umd'
import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'

type CreateCheckin = {
  id: string
  areaId: string
  publicKey: string
  enteredAt: Date
}

type UpdateCheckin = {
  id: string
  leftAt: Date
}

type TicketResponse = {
  id?: string
  business: string
  enteredAt?: Date
  leftAt?: Date
}

type TicketRequest = {
  id?: string
  areaId?: string
  enteredAt?: string
  leftAt?: string
  encryptedData?: string
  publicKey?: string
}

const api = ky.create({ prefixUrl: process.env.apiBase })

async function postTicket(ticket: TicketRequest): Promise<TicketResponse> {
  const json = snakecaseKeys({ ticket }, { deep: true })
  const parsed: any = await api.post('tickets', { json }).json() // eslint-disable-line @typescript-eslint/no-explicit-any
  const camelCased = camelcaseKeys(parsed, { deep: true })
  return camelCased.ticket
}

async function patchTicket(ticket: TicketRequest): Promise<TicketResponse> {
  const json = snakecaseKeys({ ticket }, { deep: true })
  const parsed: any = await api.patch('tickets/' + ticket.id, { json }).json() // eslint-disable-line @typescript-eslint/no-explicit-any
  const camelCased = camelcaseKeys(parsed, { deep: true })
  return camelCased.ticket
}

function binKey(key: string): Uint8Array {
  return Uint8Array.from(atob(key), (c) => c.charCodeAt(0))
}

function encrypt(publicKey: string, plain: string): string {
  const input = new TextEncoder().encode(plain)
  const sealed = seal(input, binKey(publicKey))
  const encrypted = btoa(String.fromCharCode.apply(null, sealed))
  return encrypted
}

function toCSV(values: string[]): string {
  return values.map((v) => JSON.stringify(v)).join()
}

export async function createCheckin(data: CreateCheckin): Promise<db.Checkin> {
  const guest = await db.getGuest()
  const csv = toCSV([guest.name, guest.phone])
  const encrypted = encrypt(data.publicKey, csv)

  const response = await postTicket({
    id: data.id,
    areaId: data.areaId,
    encryptedData: encrypted,
    enteredAt: data.enteredAt.toISOString(),
    publicKey: data.publicKey,
  })

  const checkin = await db.addCheckin({
    id: data.id,
    business: response.business,
    enteredAt: data.enteredAt,
  })

  return checkin
}

export async function checkoutTicket(data: UpdateCheckin): Promise<db.Checkin> {
  await patchTicket({ id: data.id, leftAt: data.leftAt.toISOString() })
  const checkin = await db.updateCheckin(data.id, { leftAt: data.leftAt })
  return checkin
}
