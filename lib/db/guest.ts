import { db } from './'

export enum GuestHealthDocumentEnum {
  tested = 'TESTED',
  vaccinated = 'VACCINATED',
  hadCorona = 'HAD_CORONA',
}

export interface Guest {
  id?: number
  name?: string
  phone?: string
  address?: string
  postalCode?: string
  city?: string
  resident?: string
  checkedInCompanyIds?: string[]
  providedHealthDocument?: GuestHealthDocumentEnum
}

export async function getCurrentGuest(): Promise<Guest> {
  const guest = await db.guests.toCollection().first()
  return guest
}

export async function updateGuest(changedGuest: Guest): Promise<Guest> {
  let guest = await db.guests.toCollection().first()
  await db.guests.update(guest.id, changedGuest)
  guest = await getCurrentGuest()
  return guest
}

export async function addGuest(newGuest: Guest): Promise<Guest> {
  await db.guests.add(newGuest)
  const guest = await getCurrentGuest()
  return guest
}
