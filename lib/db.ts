// eslint-disable-next-line import/no-named-as-default
import Dexie from 'dexie'

export interface Checkin {
  id?: string
  business: string
  enteredAt: Date
  leftAt?: Date
}

export interface Guest {
  id?: number
  name: string
  phone: string
}

class RcvrDatabase extends Dexie {
  checkins: Dexie.Table<Checkin, string>
  guests: Dexie.Table<Guest, number>

  constructor() {
    super('RcvrDatabase')
    this.version(1).stores({
      checkins: 'id, business, enteredAt, leftAt',
      guests: '++id, name, phone',
    })

    this.checkins = this.table('checkins')
    this.guests = this.table('guests')
  }
}

export const db = new RcvrDatabase()

export async function getGuest(): Promise<Guest> {
  const guest = await db.guests.toCollection().first()
  return guest
}

export async function addGuest(guestData: Guest): Promise<Guest> {
  await db.guests.add(guestData)
  const guest = await getGuest()
  return guest
}

export async function getCheckin(id: string): Promise<Checkin> {
  const checkin = await db.checkins.get(id)
  return checkin
}

export async function addCheckin(checkinData: Checkin): Promise<Checkin> {
  const id = await db.checkins.add(checkinData)
  const checkin = await getCheckin(id)
  return checkin
}
