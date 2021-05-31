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
  try {
    await api.patchTicket({ id: checkin.id, leftAt })
  } catch (error) {
    // This can fail because tickets are deleted after some time
    // in the backend.
    console.error(error)
  }

  const checkout = await db.updateCheckin({
    id: checkin.id,
    leftAt: leftAt,
    guest: null,
  })
  queryClient.invalidateQueries('checkins')
  return checkout
}
