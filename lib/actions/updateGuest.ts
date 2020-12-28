import {
  getLastNonProxyCheckin,
  updateCheckin,
  updateGuest,
  getCurrentGuest,
} from '~lib/db'
import { queryCache } from 'react-query'
import * as db from '../db'
import * as api from '../api'
import { encrypt, toCSV } from '../crypto'

export async function updateCurrentGuest(guest: db.Guest): Promise<db.Checkin> {
  // First we update the current guest in local DB (if it exists)
  const currentGuest = await getCurrentGuest()
  if (currentGuest) {
    await updateGuest(guest)
  }
  // The we fetch and update the last checkin
  const currentCheckin = await getLastNonProxyCheckin()
  currentCheckin.guest = guest
  const updatedCheckin = await updateCheckin(currentCheckin)
  // We also need to update the data in the API (only if the public key is available (downwards compability))
  if (updatedCheckin.k) {
    const csv = toCSV(updatedCheckin.guest)
    const encryptedData = encrypt(updatedCheckin.k, csv)
    await api.patchTicket({
      id: updatedCheckin.id,
      encryptedData: encryptedData,
    })
  }
  // Finally we need to refresh the checkins in order to display it in my-checkins
  queryCache.refetchQueries('checkins', { force: true })
  return updatedCheckin
}
