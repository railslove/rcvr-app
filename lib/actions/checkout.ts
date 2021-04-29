import * as db from '../db'
import * as api from '../api'
import { QueryClient } from 'react-query'

interface Params {
  queryClient: QueryClient
  checkin: db.Checkin
}

export async function checkout(params: Params): Promise<db.Checkin> {
  const { queryClient, checkin } = params
  const leftAt = new Date()
  const ticket = await api.patchTicket({ id: checkin.id, leftAt })

  const checkout = await db.updateCheckin({
    id: checkin.id,
    leftAt: ticket.leftAt,
    guest: null,
  })
  queryClient.invalidateQueries('checkins')
  return checkout
}
