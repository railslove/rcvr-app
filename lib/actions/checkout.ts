import * as db from '../db'
import * as api from '../api'

export async function checkout(checkin: db.Checkin): Promise<db.Checkin> {
  const queryClient = useQueryClient()
  const leftAt = new Date()
  const ticket = await api.patchTicket({ id: checkin.id, leftAt })

  const checkout = await db.updateCheckin({
    id: checkin.id,
    leftAt: ticket.leftAt,
    guest: null,
  })
  queryClient.invalidateQueries('checkins', { force: true })
  return checkout
}
