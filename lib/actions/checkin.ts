import * as db from '../db'
import * as api from '../api'
import { encrypt, toCSV } from '../crypto'

interface Params {
  ticket: api.TicketReq
  guest: db.Guest
  companyId?: api.CompanyRes['id']
  cwaSeed?: string
}

export async function checkin(params: Params): Promise<db.Checkin> {
  const { ticket, guest, companyId, cwaSeed } = params

  const csv = toCSV(guest)
  const encryptedData = encrypt(ticket.publicKey, csv)

  const ticketRes = await api.postTicket({ ...ticket, encryptedData })
  const checkin = await db.addCheckin({
    id: ticket.id,
    areaId: ticket.areaId,
    business: ticketRes.companyName,
    address: ticketRes.companyAddress,
    locationType: ticketRes.companyLocationType,
    enteredAt: ticket.enteredAt,
    proxyCheckin: ticket.proxyCheckin,
    guest: guest,
    companyCwaUrl: ticketRes.companyCwaUrl,
    k: ticket.publicKey,
    autoCheckoutTime: ticketRes.companyAutoCheckoutTime,
    cwaSeed,
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
