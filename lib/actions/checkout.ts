import { queryCache } from 'react-query'
import * as db from '../db'
import * as api from '../api'

export async function checkout(checkin: db.Checkin): Promise<db.Checkin> {
  const leftAt = new Date()

  try {
    await api.patchTicket({ id: checkin.id, leftAt })
  } catch (error) {
    // most likely because of auto-checkout
    console.warn(
      'Could not checkout. Most likely the checkin was already auto-checkouted. Setting checkout date to now.',
      error
    )
  }

  const checkout = await db.updateCheckin({ id: checkin.id, leftAt })
  queryCache.refetchQueries('checkins', { force: true })
  return checkout
}
