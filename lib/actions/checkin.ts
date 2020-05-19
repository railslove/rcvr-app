import * as db from '../db'
import * as api from '../api'
import { encrypt } from '../crypto'

interface Params {
  ticket: api.TicketReq & { encryptedData: undefined }
  guest: db.Guest
}

function toCSV(values: string[]): string {
  return values.map((v) => JSON.stringify(v)).join()
}

export async function checkin({ ticket, guest }: Params): Promise<db.Checkin> {
  const csv = toCSV([guest.name, guest.phone, guest.address])
  const encryptedData = encrypt(ticket.publicKey, csv)

  const ticketRes = await api.postTicket({ ...ticket, encryptedData })
  const checkin = await db.addCheckin({
    id: ticket.id,
    areaId: ticket.areaId,
    business: ticketRes.companyName,
    enteredAt: ticket.enteredAt,
  })

  return checkin
}
