import { queryCache } from 'react-query'
import * as db from '../db'
import * as api from '../api'

export async function checkout(checkin: db.Checkin): Promise<db.Checkin> {
  const leftAt = new Date()
  const ticket = await api.patchTicket({ id: checkin.id, leftAt })

  const checkout = await db.updateCheckin({
    id: checkin.id,
    leftAt: ticket.leftAt,
    guest: null,
  })
  queryCache.refetchQueries('checkins', { force: true })
  return checkout
}
