import * as db from '@lib/db'
import { encrypt } from '@lib/crypto'
import ky from 'ky/umd'
import camelcaseKeys from 'camelcase-keys' // eslint-disable-line import/default
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
  companyName: string
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

type OwnerRequest = {
  email: string
  password?: string
  name?: string
  publicKey?: string
}

type OwnerResponse = {
  id: number
  email: string
  name?: string
  publicKey?: string
  token?: string
}

const api = ky.create({ prefixUrl: process.env.apiBase, timeout: false })

async function postTicket(ticket: TicketRequest): Promise<TicketResponse> {
  const json = snakecaseKeys({ ticket }, { deep: true })
  const parsed: any = await api.post('tickets', { json }).json() // eslint-disable-line @typescript-eslint/no-explicit-any
  const camelCased = camelcaseKeys(parsed, { deep: true })
  return camelCased
}

async function patchTicket(ticket: TicketRequest): Promise<TicketResponse> {
  const json = snakecaseKeys({ ticket }, { deep: true })
  const parsed: any = await api.patch('tickets/' + ticket.id, { json }).json() // eslint-disable-line @typescript-eslint/no-explicit-any
  const camelCased = camelcaseKeys(parsed, { deep: true })
  return camelCased
}

async function postSignup(owner: OwnerRequest): Promise<OwnerResponse> {
  const json = snakecaseKeys({ owner }, { deep: true })
  const res: any = await api.post('signup', { json }) // eslint-disable-line @typescript-eslint/no-explicit-any
  const parsed = await res.json()
  const token = res.headers.get('Authorization').replace('Bearer ', '')
  const camelCased = camelcaseKeys(parsed, { deep: true })
  return { ...camelCased, token }
}

async function patchOwner(owner: OwnerRequest): Promise<OwnerResponse> {
  const json = snakecaseKeys({ owner }, { deep: true })
  const parsed: any = await await api.post('signup', { json }).json() // eslint-disable-line @typescript-eslint/no-explicit-any
  const camelCased = camelcaseKeys(parsed, { deep: true })
  return camelCased
}

async function postLogin(owner: OwnerRequest): Promise<OwnerResponse> {
  const json = snakecaseKeys({ owner }, { deep: true })
  const res: any = await api.post('login', { json }) // eslint-disable-line @typescript-eslint/no-explicit-any
  const parsed = await res.json()
  const token = res.headers.get('Authorization').replace('Bearer ', '')
  const camelCased = camelcaseKeys(parsed, { deep: true })
  return { ...camelCased, token }
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
    business: response.companyName,
    enteredAt: data.enteredAt,
  })

  return checkin
}

export async function checkoutTicket(data: UpdateCheckin): Promise<db.Checkin> {
  await patchTicket({ id: data.id, leftAt: data.leftAt.toISOString() })
  const checkin = await db.updateCheckin(data.id, { leftAt: data.leftAt })
  return checkin
}

export async function createOwner(data: OwnerRequest): Promise<db.Owner> {
  const ownerRes = await postSignup(data)
  const owner = await db.addOwner({
    id: ownerRes.id,
    email: ownerRes.email,
  })
  sessionStorage.setItem('rcvr_olt', ownerRes.token)
  return owner
}

export async function updateOwner(data: OwnerRequest): Promise<db.Owner> {
  const ownerRes = await patchOwner(data)
  const owner = await db.updateOwner(ownerRes.id, { publicKey: data.publicKey })
  return owner
}

export async function loginOwner(data: OwnerRequest): Promise<db.Owner> {
  const { token, ...ownerData } = await postLogin(data)
  let owner = await db.getOwner(ownerData.id)
  if (!owner) {
    owner = await db.addOwner(ownerData)
  }
  sessionStorage.setItem('rcvr_olt', token)
  sessionStorage.setItem('rcvr_oid', JSON.stringify(ownerData.id))
  return owner
}
