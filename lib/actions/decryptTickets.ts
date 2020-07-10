import { DataRequestTicket } from '../api'
import { fromCSV, decrypt } from '../crypto'

interface DecryptionResult {
  decryptionStatus: 'pending' | 'success' | 'error'
  guest: {
    name: string
    phone: string
    address: string
    resident?: string
  }
}

export type DecryptedTicket = DecryptionResult & DataRequestTicket
interface Result {
  tickets: DecryptedTicket[]
  successCount: number
  errorCount: number
  pendingCount: number
}

export function decryptTickets(
  tickets: DataRequestTicket[],
  publicKey: string,
  privateKey?: string
): Result {
  const decryptedTickets = tickets.map((ticket) => {
    let guest: DecryptionResult['guest']
    let decryptionStatus: DecryptionResult['decryptionStatus'] = 'pending'

    if (privateKey) {
      try {
        const decrypted = decrypt(ticket.encryptedData, publicKey, privateKey)
        guest = fromCSV(decrypted)
        decryptionStatus = 'success'
      } catch (error) {
        console.warn('Could not decrypt, Error:', error)
        decryptionStatus = 'error'
        guest = null
      }
    }

    return { ...ticket, guest, decryptionStatus }
  })

  const pendingCount = decryptedTickets.filter(
    (t) => t.decryptionStatus === 'pending'
  ).length
  const successCount = decryptedTickets.filter(
    (t) => t.decryptionStatus === 'success'
  ).length
  const errorCount = decryptedTickets.filter(
    (t) => t.decryptionStatus === 'error'
  ).length

  return { tickets: decryptedTickets, successCount, errorCount, pendingCount }
}
