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

type OwnerSignup = {
  email: string
  password: string
  name: string
}

type OwnerLogin = {
  email: string
  password: string
}

type OwnerPatch = {
  id: number
  publicKey: string
}

type OwnerResponse = {
  id: number
  email: string
  name?: string
  publicKey?: string
  token?: string
}

type CompanyResponse = {
  id: string
  name: string
  areas: AreaResponse[]
}

type AreaPost = {
  name: string
  companyId: string
}

type AreaResponse = {
  id: string
  name: string
}

const api = ky.create({ prefixUrl: process.env.apiBase, timeout: false })

export async function fetchCompany(
  companyId: string
): Promise<CompanyResponse> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsed: any = await api
    .get(`companies/${companyId}`, {
      headers: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('rcvr_olt'),
      },
    })
    .json()
  return parsed
}

export async function fetchCompanies(): Promise<CompanyResponse[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsed: any = await api
    .get('companies', {
      headers: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('rcvr_olt'),
      },
    })
    .json()
  return parsed
}

export async function postCompany(company: {
  name: string
}): Promise<CompanyResponse> {
  const json = snakecaseKeys({ company }, { deep: true })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsed: any = await api
    .post('companies', {
      json,
      headers: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('rcvr_olt'),
      },
    })
    .json()
  return parsed
}

export async function postArea(area: AreaPost): Promise<AreaResponse> {
  const json = snakecaseKeys({ area }, { deep: true })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsed: any = await api
    .post(`companies/${area.companyId}/areas`, {
      json,
      headers: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('rcvr_olt'),
      },
    })
    .json()
  const camelCased = camelcaseKeys(parsed, { deep: true })
  return camelCased
}

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

async function postSignup(owner: OwnerSignup): Promise<OwnerResponse> {
  const json = snakecaseKeys({ owner }, { deep: true })
  const res: any = await api.post('signup', { json }) // eslint-disable-line @typescript-eslint/no-explicit-any
  const token = res.headers.get('Authorization').replace('Bearer ', '')
  const parsed = await res.json()
  const camelCased = camelcaseKeys(parsed, { deep: true })
  return { ...camelCased, token }
}

async function patchOwner(owner: OwnerPatch): Promise<OwnerResponse> {
  const json = snakecaseKeys({ owner }, { deep: true })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsed: any = await api
    .patch('owner', {
      json,
      headers: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('rcvr_olt'),
      },
    })
    .json()
  const camelCased = camelcaseKeys(parsed, { deep: true })
  return camelCased
}

async function postLogin(owner: OwnerLogin): Promise<OwnerResponse> {
  const json = snakecaseKeys({ owner }, { deep: true })
  const res: any = await api.post('login', { json }) // eslint-disable-line @typescript-eslint/no-explicit-any
  const token = res.headers.get('Authorization').replace('Bearer ', '')
  const parsed = await res.json()
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

export async function createOwner(data: OwnerSignup): Promise<db.Owner> {
  const ownerRes = await postSignup(data)
  const owner = await db.addOwner({
    id: ownerRes.id,
    email: ownerRes.email,
  })
  sessionStorage.setItem('rcvr_olt', ownerRes.token)
  sessionStorage.setItem('rcvr_oid', JSON.stringify(ownerRes.id))
  return owner
}

export async function updateOwner(data: OwnerPatch): Promise<db.Owner> {
  const ownerRes = await patchOwner(data)
  const owner = await db.updateOwner(ownerRes.id, { publicKey: data.publicKey })
  return owner
}

export async function loginOwner(data: OwnerLogin): Promise<db.Owner> {
  const { token, ...ownerData } = await postLogin(data)
  let owner = await db.getOwner(ownerData.id)
  if (!owner) {
    owner = await db.addOwner(ownerData)
  }
  sessionStorage.setItem('rcvr_olt', token)
  sessionStorage.setItem('rcvr_oid', JSON.stringify(ownerData.id))
  return owner
}
