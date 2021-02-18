import * as db from '../db'
import * as api from '../api'
import { encrypt, toCSV } from '../crypto'

interface Params {
  ticket: api.TicketReq
  guest: db.Guest
  companyId?: api.CompanyRes['id']
}

export async function checkin(params: Params): Promise<db.Checkin> {
  const { ticket, guest, companyId } = params

  const csv = toCSV(guest)
  const encryptedData = encrypt(ticket.publicKey, csv)

  const ticketRes = await api.postTicket({ ...ticket, encryptedData })
  const checkin = await db.addCheckin({
    id: ticket.id,
    areaId: ticket.areaId,
    business: ticketRes.companyName,
    enteredAt: ticket.enteredAt,
    proxyCheckin: ticket.proxyCheckin,
    guest: guest,
    k: ticket.publicKey,
  })

  const latestGuest = await db.getCurrentGuest()
  const checkedInCompanyIds = latestGuest?.checkedInCompanyIds || []
  if (latestGuest && !checkedInCompanyIds.includes(companyId)) {
    await db.updateGuest({
      id: latestGuest.id,
      checkedInCompanyIds: [companyId, ...checkedInCompanyIds],
    })
  }

  return checkin
}
