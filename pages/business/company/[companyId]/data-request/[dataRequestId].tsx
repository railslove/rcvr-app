import * as React from 'react'
import { useRouter } from 'next/router'
import formatDate from 'intl-dateformat'
import { useEffectOnce } from 'react-use'
import { writeFile, utils as xlsx } from 'xlsx'

import { DataRequestTicket } from '~lib/api'
import { decrypt, fromCSV } from '~lib/crypto'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { useCompany, useDataRequest, useModals } from '~lib/hooks'
import { Text, Box, Callout, Table, Button } from '~ui/core'
import { OwnerApp, BackLink } from '~ui/layouts/OwnerApp'
import { PrivateKeyModal } from '~ui/modals/PrivateKeyModal'

interface DecryptionResult {
  decryptionStatus: 'pending' | 'success' | 'error'
  guest: {
    name: string
    phone: string
    address: string
  }
}

type DecryptedTicket = DecryptionResult & DataRequestTicket

const DataRequestPage: React.FC<WithOwnerProps> = ({ owner }) => {
  const { query } = useRouter()
  const companyId = query.companyId.toString()
  const dataRequestId = query.dataRequestId.toString()
  const { data: company } = useCompany(companyId)
  const { data: dataRequest, status } = useDataRequest(companyId, dataRequestId)
  const { modals, openModal } = useModals({
    privateKey: PrivateKeyModal,
  })

  useEffectOnce(() => {
    if (!owner.privateKey) {
      openModal('privateKey', { ownerId: owner.id })
    }
  })

  const handleEnterKey = React.useCallback(() => {
    openModal('privateKey', { ownerId: owner.id })
  }, [openModal, owner])

  const decryptedTickets: DecryptedTicket[] = React.useMemo(() => {
    if (!dataRequest) return []

    return dataRequest?.tickets?.map((ticket) => {
      let guest: DecryptionResult['guest']
      let decryptionStatus: DecryptionResult['decryptionStatus'] = 'pending'

      if (owner.privateKey) {
        try {
          const decrypted = decrypt(
            ticket.encryptedData,
            owner.publicKey,
            owner.privateKey
          )
          guest = fromCSV(decrypted)
          decryptionStatus = 'success'
        } catch (error) {
          console.warn('Could not decrypt, Error:', error)
          decryptionStatus = 'error'
          guest = null
        }
      }

      return { ...ticket, decryptionStatus, guest }
    })
  }, [dataRequest, owner])

  const pendingCount = React.useMemo(() => {
    return decryptedTickets?.filter(
      (ticket) => ticket.decryptionStatus === 'pending'
    ).length
  }, [decryptedTickets])
  const successCount = React.useMemo(() => {
    return decryptedTickets?.filter(
      (ticket) => ticket.decryptionStatus === 'success'
    ).length
  }, [decryptedTickets])
  const errorCount = React.useMemo(() => {
    return decryptedTickets?.filter(
      (ticket) => ticket.decryptionStatus === 'error'
    ).length
  }, [decryptedTickets])

  const handleDownload = React.useCallback(() => {
    const downloadableTickets = decryptedTickets.map((ticket) => ({
      enteredAt: formatDate(ticket.enteredAt, 'DD.MM.YYYY HH:mm'),
      leftAt: ticket.leftAt
        ? formatDate(ticket.leftAt, 'DD.MM.YYYY HH:mm')
        : '-',
      areaName: ticket.areaName,
      name: ticket.guest?.name ?? '-',
      address: ticket.guest?.address ?? '-',
      phone: ticket.guest?.phone ?? '-',
    }))

    const book = xlsx.book_new()
    const sheet = xlsx.json_to_sheet(
      [
        {
          enteredAt: 'Eingecheckt um',
          leftAt: 'Ausgecheckt um',
          areaName: 'Bereich',
          name: 'Name',
          address: 'Adresse',
          phone: 'Telefon',
        },
        ...downloadableTickets,
      ],
      { skipHeader: true }
    )
    sheet['!cols'] = [
      { wch: 20 },
      { wch: 20 },
      { wch: 10 },
      { wch: 20 },
      { wch: 30 },
      { wch: 15 },
    ]
    xlsx.book_append_sheet(book, sheet, 'Kontaktdaten')
    writeFile(book, 'download.xlsx')
  }, [decryptedTickets])

  const dateRange =
    dataRequest?.from && dataRequest?.to
      ? formatDate(dataRequest.from, 'DD.MM.YYYY HH:mm') +
        ' – ' +
        formatDate(dataRequest.to, 'DD.MM.YYYY HH:mm')
      : ''

  return (
    <OwnerApp
      title={
        dateRange ? `Kundenkontaktdaten vom ${dateRange}` : 'Kundenkontaktdaten'
      }
    >
      {modals}
      <BackLink
        href="/business/company/[companyId]"
        as={`/business/company/${companyId}`}
      >
        {company?.name}
      </BackLink>
      <Box height={2} />
      {status !== 'success' && <Text variant="shy">Lade...</Text>}

      {dataRequest && !dataRequest.acceptedAt && (
        <Callout>
          <Text>
            Die Daten für diesen Zeitraum wurden noch nicht für Dich
            freigegeben.
          </Text>
        </Callout>
      )}

      {dataRequest?.tickets && !owner.privateKey && (
        <Box mb={4}>
          <Text>
            Dein privater Schlüssel ist nicht mehr auf deinem Gerät gespeichert.
            Um die Daten zu entschlüsseln, musst du ihn neu eingeben.
          </Text>
          <Box height={4} />
          <Button onClick={handleEnterKey}>Schlüssel eingeben</Button>
        </Box>
      )}

      {dataRequest?.tickets && pendingCount === 0 && (
        <Box>
          <Text variant="shy">{successCount} Checkins entschlüsselt.</Text>
          {errorCount > 0 && (
            <Text variant="shy">
              {errorCount} Checkins konnten nicht entschlüsselt werden.
            </Text>
          )}
          <Box height={4} />
          {successCount === 0 && errorCount > 0 && (
            <>
              <Callout variant="danger">
                <Text>
                  Keine Daten konnten entschlüsselt werden. Wahrscheinlich ist
                  dein privater Schlüssel nicht korrekt. Bitte gib ihn neu ein.
                </Text>
              </Callout>
              <Box height={4} />
              <Button type="button" onClick={handleEnterKey}>
                Schlüssel neu eingeben
              </Button>
            </>
          )}
          <Box height={4} />
          <Button onClick={handleDownload}>Download (Excel)</Button>
        </Box>
      )}

      {dataRequest?.tickets && (
        <Box mx={-4} p={4} css={{ overflow: 'scroll' }}>
          <Table css={{ maxWidth: '100%' }}>
            <thead>
              <tr>
                <th>Von</th>
                <th>Bis</th>
                <th>Bereich</th>
                <th>Name</th>
                <th>Adresse</th>
                <th>Telefon</th>
              </tr>
            </thead>
            <tbody>
              {decryptedTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{formatDate(ticket.enteredAt, 'DD.MM.YYYY HH:mm')}</td>
                  <td>
                    {ticket.leftAt
                      ? formatDate(ticket.leftAt, 'DD.MM.YYYY HH:mm')
                      : '–'}
                  </td>
                  <td>{ticket.areaName}</td>
                  {ticket.decryptionStatus === 'pending' && (
                    <td colSpan={3}>noch verschlüsselt</td>
                  )}
                  {ticket.decryptionStatus === 'error' && (
                    <td colSpan={3}>nicht entschlüsselbar</td>
                  )}
                  {ticket.decryptionStatus === 'success' && (
                    <>
                      <td>{ticket.guest.name}</td>
                      <td>{ticket.guest.address}</td>
                      <td>{ticket.guest.phone}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      )}
    </OwnerApp>
  )
}

export default withOwner()(DataRequestPage)
