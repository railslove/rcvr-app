import {
  getLastNonProxyCheckin,
  updateCheckin,
  updateGuest,
  getCurrentGuest,
} from '~lib/db'
import { QueryClient } from 'react-query'
import * as db from '../db'
import * as api from '../api'
import { encrypt, toCSV } from '../crypto'

interface Params {
  ticket: api.TicketReq
  guest: db.Guest
}

export async function cwaCheckIn(
  queryClient: QueryClient,
  guest: db.Guest
): Promise<db.Checkin> {
  // fetch and update the last checkin
  const currentCheckin = await getLastNonProxyCheckin()
  guest.CWACheckedIn = (currentCheckin.guest.CWACheckedIn || 0) + 1
  currentCheckin.guest = guest

  const updatedCheckin = await updateCheckin(currentCheckin)
  // We also need to update the data in the API (only if the public key is available (downwards compability))
  if (updatedCheckin.k) {
    const csv = toCSV(updatedCheckin.guest)
    const encryptedData = encrypt(updatedCheckin.k, csv)
    await api.patchTicket({
      id: updatedCheckin.id,
      encryptedData: encryptedData,
      CWACheckedIn: updatedCheckin.guest.CWACheckedIn,
    })
  }
  // Finally we need to refresh the checkins in order to display it in my-checkins
  queryClient.invalidateQueries('checkins')
  return updatedCheckin
}
