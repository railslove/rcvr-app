import * as React from 'react'
import Dexie from 'dexie' // eslint-disable-line import/no-named-as-default
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { subDays } from 'date-fns'

export interface Checkin {
  id?: string
  companyId: string
  business: string
  enteredAt: Date
  areaId: string
  leftAt?: Date
}

export interface CheckinChangeset {
  leftAt?: Date
}

export interface Guest {
  id?: number
  name: string
  phone: string
  address: string
  acceptedPrivacy: string[]
}

export interface GuestChangeset {
  name?: string
  phone?: string
  address?: string
}

export interface Owner {
  id: number
  email: string
  privateKey?: string
  publicKey?: string
}

export interface OwnerChangeset {
  publicKey?: string
  privateKey?: string
}

class RcvrDatabase extends Dexie {
  checkins: Dexie.Table<Checkin, string>
  guests: Dexie.Table<Guest, number>
  owners: Dexie.Table<Owner, number>

  constructor() {
    super('RcvrDatabase')
    this.version(2).stores({
      checkins: 'id, enteredAt',
      guests: '++id',
      owners: 'id, email',
    })

    this.checkins = this.table('checkins')
    this.guests = this.table('guests')
    this.owners = this.table('owners')
  }
}

export const db = new RcvrDatabase()

export async function getGuest(): Promise<Guest> {
  const guest = await db.guests.toCollection().first()
  return guest
}

export async function updateGuest(changes: GuestChangeset): Promise<Guest> {
  let guest = await db.guests.toCollection().first()
  await db.guests.update(guest.id, changes)
  guest = await getGuest()
  return guest
}

export async function addGuest(guestData: Guest): Promise<Guest> {
  await db.guests.add(guestData)
  const guest = await getGuest()
  return guest
}

export async function getOwner(id: number): Promise<Owner> {
  const owner = await db.owners.get(id)
  return owner
}

export async function getCurrentOwner(): Promise<Owner | undefined> {
  const oid = window.sessionStorage.getItem('rcvr_oid')
  if (!oid) return undefined
  const owner = await getOwner(+oid)
  return owner
}

export function isLoggedIn(): boolean {
  const oid = window.sessionStorage.getItem('rcvr_oid')
  return oid != null
}

type UseOwner =
  | {
      owner: Owner
      refetch: () => Promise<Owner>
    }
  | undefined
type UseOwnerConfig =
  | {
      redirect?: boolean
    }
  | undefined

export function useOwner({ redirect = true }: UseOwnerConfig = {}): UseOwner {
  const { data: currentOwner, refetch } = useQuery(
    'currentOwner',
    getCurrentOwner
  )
  const router = useRouter()

  React.useEffect(() => {
    if (redirect && !isLoggedIn()) {
      router.push('/business')
      return undefined
    }
  }, [router, currentOwner, redirect])

  return { owner: currentOwner, refetch }
}

export async function addOwner(ownerData: Owner): Promise<Owner> {
  await db.owners.add(ownerData)
  const owner = await getOwner(ownerData.id)
  return owner
}

export async function updateOwner(
  id: number,
  changes: OwnerChangeset
): Promise<Owner> {
  await db.owners.update(id, changes)
  const owner = await getOwner(id)
  return owner
}

export async function getCheckin(id: string): Promise<Checkin> {
  const checkin = await db.checkins.get(id)
  return checkin
}

export async function getAllCheckins(): Promise<Checkin[]> {
  const showCheckinsFromLastDays = 28

  const checkins = await db.checkins
    .where('enteredAt')
    .above(subDays(new Date(), showCheckinsFromLastDays))
    .reverse()
    .sortBy('enteredAt')
  return checkins
}

export async function getLastCheckin(): Promise<Checkin> {
  const checkins = await getAllCheckins()
  return checkins[0]
}

export async function addCheckin(checkinData: Checkin): Promise<Checkin> {
  const id = await db.checkins.add(checkinData)
  const checkin = await getCheckin(id)
  return checkin
}

export async function updateCheckin(
  id: string,
  changes: CheckinChangeset
): Promise<Checkin> {
  await db.checkins.update(id, changes)
  const checkin = await getCheckin(id)
  return checkin
}

export async function setAcceptedPrivacy(companyId: string): Promise<Guest> {
  let guest = await getGuest()
  if (!guest.acceptedPrivacy) guest.acceptedPrivacy = []
  if (guest.acceptedPrivacy.indexOf(companyId) < 0)
    guest.acceptedPrivacy.push(companyId)
  await db.guests.update(guest.id, guest)
  guest = await getGuest()
  return guest
}
