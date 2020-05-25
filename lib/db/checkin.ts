import { subDays } from 'date-fns'
import { db } from './'

export interface Checkin {
  id?: string
  business?: string
  enteredAt?: Date
  areaId?: string
  leftAt?: Date
}

export async function getCheckin(checkinId: Checkin['id']): Promise<Checkin> {
  const checkin = await db.checkins.get(checkinId)
  return checkin
}

export async function getVisibleCheckins(): Promise<Checkin[]> {
  const SHOW_FROM_LAST_DAYS = 28

  const checkins = await db.checkins
    .where('enteredAt')
    .above(subDays(new Date(), SHOW_FROM_LAST_DAYS))
    .reverse()
    .sortBy('enteredAt')
  return checkins
}

export async function getLastCheckin(): Promise<Checkin> {
  const checkins = await getVisibleCheckins()
  return checkins[0]
}

export async function addCheckin(newCheckin: Checkin): Promise<Checkin> {
  const id = await db.checkins.add(newCheckin)
  const checkin = await getCheckin(id)
  return checkin
}

export async function updateCheckin(changedCheckin: Checkin): Promise<Checkin> {
  const { id, ...changes } = changedCheckin
  await db.checkins.update(id, changes)
  const checkin = await getCheckin(id)
  return checkin
}
