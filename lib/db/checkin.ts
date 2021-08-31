import { subDays } from 'date-fns'
import { db, Guest } from './'
import { v4 as uuidv4 } from 'uuid'

export interface Checkin {
  id?: string
  business?: string
  address?: string
  locationType?: string
  enteredAt?: Date
  areaId?: string
  leftAt?: Date
  proxyCheckin?: boolean
  guest?: Guest
  k?: string
  cwaSeed?: string
  autoCheckoutTime?: number
  cwaLinkEnabled?: boolean
}

let checkinsState: Checkin[] = []

export async function getCheckin(checkinId: Checkin['id']): Promise<Checkin> {
  const checkin = await db.checkins
    .get(checkinId)
    .catch(() =>
      checkinsState.find((checkin: Checkin) => checkin.id === checkinId)
    )
  return checkin
}

export async function getVisibleCheckins(): Promise<Checkin[]> {
  const SHOW_FROM_LAST_DAYS = 28

  const checkins = await db.checkins
    .where('enteredAt')
    .above(subDays(new Date(), SHOW_FROM_LAST_DAYS))
    .reverse()
    .sortBy('enteredAt')
    .catch(() =>
      // We need to return a clone to trigger a repaint
      checkinsState.slice(0)
    )
  return checkins
}

export async function getLastCheckin(): Promise<Checkin> {
  const checkins = await getVisibleCheckins()
  return checkins[0] || checkinsState.slice(-1)[0]
}

export async function getLastNonProxyCheckin(): Promise<Checkin> {
  const checkins = await getVisibleCheckins()
  return checkins.find((checkin) => !checkin.proxyCheckin)
}

export async function addCheckin(newCheckin: Checkin): Promise<Checkin> {
  const id = await db.checkins.add(newCheckin).catch(() => {
    const id = uuidv4()
    checkinsState.push({ id, ...newCheckin })
    return id
  })
  const checkin = await getCheckin(id)
  return checkin
}

export async function updateCheckin(changedCheckin: Checkin): Promise<Checkin> {
  const { id, ...changes } = changedCheckin
  await db.checkins.update(id, changes).catch(() => {
    const checkin = checkinsState.find((checkin) => checkin.id === id)
    checkinsState = checkinsState.filter((checkin) => checkin.id === id)
    checkinsState.push({
      ...checkin,
      ...changedCheckin,
    })
  })
  const checkin = await getCheckin(id)
  return checkin
}
