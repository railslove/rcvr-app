import * as React from 'react'
import { useRouter } from 'next/router'
import formatDate from 'intl-dateformat'
import { useEffectOnce } from 'react-use'

import { isCareEnv } from '~lib/config'
import { decryptTickets, DecryptedTicket } from '~lib/actions'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { useCompany, useDataRequest, useModals } from '~lib/hooks'
import { Text, Box, Callout, Table, Button } from '~ui/core'
import { Loading } from '~ui/blocks/Loading'
import { OwnerApp, BackLink } from '~ui/layouts/OwnerApp'
import { PrivateKeyModal } from '~ui/modals/PrivateKeyModal'

function ticketsToExcel(tickets: DecryptedTicket[]) {
  const downloadableTickets = tickets.map((ticket) => ({
    enteredAt: formatDate(ticket.enteredAt, 'DD.MM.YYYY HH:mm'),
    leftAt: ticket.leftAt ? formatDate(ticket.leftAt, 'DD.MM.YYYY HH:mm') : '-',
    areaName: ticket.areaName,
    name: ticket.guest?.name ?? '-',
    address: ticket.guest?.address ?? '-',
    phone: ticket.guest?.phone ?? '-',
    resident: isCareEnv ? ticket.guest?.resident ?? '-' : undefined,
  }))
  const header = {
    enteredAt: 'Eingecheckt um',
    leftAt: 'Ausgecheckt um',
    areaName: 'Bereich',
    name: 'Name',
    address: 'Adresse',
    phone: 'Telefon',
  }

  if (isCareEnv) header['resident'] = 'Bewohnername'

  return [header, ...downloadableTickets]
}

const DataRequestPage: React.FC<WithOwnerProps> = ({ owner }) => {
  const { query } = useRouter()
  const companyId = query.companyId.toString()
  const dataRequestId = query.dataRequestId.toString()
  const { data: company } = useCompany(companyId)
  const { data: dataRequest, status } = useDataRequest(companyId, dataRequestId)
  const [loading, setLoading] = React.useState(false)
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

  const {
    tickets,
    successCount,
    errorCount,
    pendingCount,
  } = React.useMemo(() => {
    const encryptedTickets = dataRequest?.tickets || []
    const { publicKey, privateKey } = owner
    return decryptTickets(encryptedTickets, publicKey, privateKey)
  }, [dataRequest, owner])

  const handleDownload = React.useCallback(async () => {
    setLoading(true)
    const rows = ticketsToExcel(tickets)

    // generate xlsx
    const { writeFile, utils: xlsx } = await import('xlsx')
    const book = xlsx.book_new()
    const sheet = xlsx.json_to_sheet(rows, { skipHeader: true })
    const colWidths = [20, 20, 10, 20, 30, 15]
    if (isCareEnv) colWidths.push(20)
    sheet['!cols'] = colWidths.map((wch) => ({ wch }))
    const date = formatDate(dataRequest.from, 'DD.MM')
    const sheetname = date
    xlsx.book_append_sheet(book, sheet, sheetname)

    writeFile(book, `Kontaktdaten ${company?.name} ${date}.xlsx`)
    setLoading(false)
  }, [tickets, company, dataRequest])

  const dateRange =
    dataRequest?.from && dataRequest?.to
      ? formatDate(dataRequest.from, 'DD.MM.YYYY HH:mm') +
        ' – ' +
        formatDate(dataRequest.to, 'DD.MM.YYYY HH:mm')
      : ''
  const title = dateRange
    ? `Kundenkontaktdaten vom ${dateRange}`
    : 'Kundenkontaktdaten'

  const didDecrypt = dataRequest?.tickets && pendingCount === 0

  return (
    <OwnerApp title={title}>
      <Loading show={loading} />
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
            Die Daten für diesen Zeitraum wurden noch nicht für{' '}
            {isCareEnv ? 'Sie' : 'Dich'}
            freigegeben.
          </Text>
        </Callout>
      )}

      {dataRequest?.tickets && !owner.privateKey && (
        <Box mb={4}>
          <Text>
            {isCareEnv
              ? 'Dein privater Schlüssel ist nicht mehr auf deinem Gerät gespeichert. Um die Daten zu entschlüsseln, musst du ihn neu eingeben.'
              : 'Ihr privater Schlüssel ist nicht mehr auf Ihrem Gerät gespeichert. Um die Daten zu entschlüsseln, müssen Sie ihn neu eingeben.'}
          </Text>
          <Box height={4} />
          <Button onClick={handleEnterKey}>Schlüssel eingeben</Button>
        </Box>
      )}

      {didDecrypt && (
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
                  {isCareEnv ? 'Ihre' : 'dein'} privater Schlüssel nicht
                  korrekt. Bitte {isCareEnv ? 'geben Sie' : 'gib'} ihn neu ein.
                </Text>
              </Callout>
              <Box height={4} />
              <Button type="button" onClick={handleEnterKey}>
                Schlüssel neu eingeben
              </Button>
            </>
          )}
          <Box height={4} />
          <Button onClick={handleDownload}>Download als Excel</Button>
        </Box>
      )}

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
              {isCareEnv && <th>Bewohner</th>}
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
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
                    {isCareEnv && <td>{ticket.guest.resident}</td>}
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </OwnerApp>
  )
}

export default withOwner()(DataRequestPage)
