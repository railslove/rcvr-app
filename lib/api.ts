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

type CompanyTicketParams = {
  from: Date
  to: Date
  companyId: string
}

export type CompanyTicketResponse = {
  id: string
  enteredAt: string
  leftAt: string
  areaId: string
  companyName: string
  areaName: string
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
        Authorization: 'Bearer ' + sessionStorage.getItem('rcvr_olt'),
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
        Authorization: 'Bearer ' + sessionStorage.getItem('rcvr_olt'),
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
        Authorization: 'Bearer ' + sessionStorage.getItem('rcvr_olt'),
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
        Authorization: 'Bearer ' + sessionStorage.getItem('rcvr_olt'),
      },
    })
    .json()
  const camelCased = camelcaseKeys(parsed, { deep: true })
  return camelCased
}

export async function fetchTickets({
  from,
  to,
  companyId,
}: CompanyTicketParams): Promise<CompanyTicketResponse[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsed: any = await api
    .get(`companies/${companyId}/tickets`, {
      searchParams: { from: from.toISOString(), to: to.toISOString() },
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('rcvr_olt'),
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
  const json = snakecaseKeys(
    { owner: { publicKey: owner.publicKey } },
    { deep: true }
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsed: any = await api
    .patch('owner', {
      json,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('rcvr_olt'),
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

export async function createCheckin({
  ticket,
  guest,
}: {
  ticket: CreateCheckin
  guest: db.Guest
}): Promise<db.Checkin> {
  const csv = toCSV([guest.name, guest.phone, guest.address])
  const encrypted = encrypt(ticket.publicKey, csv)

  const response = await postTicket({
    id: ticket.id,
    areaId: ticket.areaId,
    encryptedData: encrypted,
    enteredAt: ticket.enteredAt.toISOString(),
    publicKey: ticket.publicKey,
  })

  const checkin = await db.addCheckin({
    id: ticket.id,
    business: response.companyName,
    enteredAt: ticket.enteredAt,
  })

  return checkin
}

export async function checkoutTicket(data: UpdateCheckin): Promise<db.Checkin> {
  try {
    await patchTicket({ id: data.id, leftAt: data.leftAt.toISOString() })
  } catch (error) {
    // most likely because of auto-checkout
    console.warn('Could not checkout. Setting checkout date to now.', error)
  }
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
  const { token, ...ownerRes } = await postLogin(data)
  let owner = await db.getOwner(ownerRes.id)

  // add owner to local db if he doesn't yet exist
  if (!owner) {
    owner = await db.addOwner(ownerRes)
  }

  // update public key in api if the publicKey exists locally but not in api
  if (owner.publicKey && !ownerRes.publicKey) {
    owner = await updateOwner({ id: owner.id, publicKey: owner.publicKey })
  }

  // update public key locally if it's missing locally but exists in api
  if (!owner.publicKey && ownerRes.publicKey) {
    owner = await db.updateOwner(ownerRes.id, { publicKey: ownerRes.publicKey })
  }

  // persist current session data temporarily
  sessionStorage.setItem('rcvr_olt', token)
  sessionStorage.setItem('rcvr_oid', JSON.stringify(ownerRes.id))

  return owner
}
