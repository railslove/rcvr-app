import { db } from './'
import { v4 as uuidv4 } from 'uuid'

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

let lastGuest: Guest = null

export async function getCurrentGuest(): Promise<Guest> {
  const guest = await db.guests
    .toCollection()
    .first()
    .catch(() => lastGuest)
  return guest
}

export async function updateGuest(changedGuest: Guest): Promise<Guest> {
  let guest = await db.guests
    .toCollection()
    .first()
    .catch(() => {
      return {
        id: uuidv4(),
        changedGuest,
      }
    })
  lastGuest = { ...(lastGuest || {}), ...changedGuest }
  await db.guests.update(guest.id, changedGuest).catch(() => null)
  guest = await getCurrentGuest()
  return guest
}

export async function addGuest(newGuest: Guest): Promise<Guest> {
  lastGuest = newGuest
  await db.guests.add(newGuest).catch(() => newGuest)
  const guest = await getCurrentGuest()
  return guest
}
