import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import formatDate from 'intl-dateformat'
import ky from 'ky-universal'
import { useRouter } from 'next/router'
import * as React from 'react'
import { QueryCache } from 'react-query'
import { useEffectOnce } from 'react-use'
import { box } from 'tweetnacl'
import { v4 as uuidv4 } from 'uuid'
import { DecryptedTicket, decryptTickets } from '~lib/actions'
import { CompanyRes, postAcceptDataRequest } from '~lib/api'
import { isCareEnv, isFormal } from '~lib/config'
import { GuestHealthDocumentEnum } from '~lib/db'
import { useCompanies, useCompany, useDataRequest, useModals } from '~lib/hooks'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { Loading } from '~ui/blocks/Loading'
import { Box, Button, Callout, Table, Text } from '~ui/core'
import { FilledCircle } from '~ui/core/FilledCircle'
import { BackLink, OwnerApp } from '~ui/layouts/OwnerApp'
import { PrivateKeyModal } from '~ui/modals/PrivateKeyModal'

const sortTickets = (tickets: DecryptedTicket[]): DecryptedTicket[] => {
  return tickets.sort(
    (c1: DecryptedTicket, c2: DecryptedTicket) =>
      c2?.leftAt?.getTime() - c1?.leftAt?.getTime()
  )
}

const quoteValue = (value: string): string => {
  return (value ?? '')
    .trim()
    .replace(/^=/g, "'=")
    .replace(/^\+/g, "'+")
    .replace(/^-/g, "'-")
    .replace(/^@/g, "'@")
}

const providedHealthDocumentToString = (value: string) => {
  switch (value) {
    case GuestHealthDocumentEnum.hadCorona:
      return 'Genesen'

    case GuestHealthDocumentEnum.vaccinated:
      return 'Geimpft'

    case GuestHealthDocumentEnum.tested:
      return 'Getestet'

    default:
      return ''
  }
}

const queryCache = new QueryCache({
  onError: (error) => {
    console.log(error)
  },
})

const ticketsToExcel = (company: CompanyRes, tickets: DecryptedTicket[]) => {
  const downloadableTickets = sortTickets(tickets).map((ticket) => ({
    enteredAt: formatDate(ticket.enteredAt, 'DD.MM.YYYY HH:mm'),
    leftAt: ticket.leftAt ? formatDate(ticket.leftAt, 'DD.MM.YYYY HH:mm') : '-',
    areaName: quoteValue(ticket.areaName),
    name: quoteValue(ticket.guest?.name ?? '-'),
    address: quoteValue(ticket.guest?.address ?? '-'),
    phone: quoteValue(ticket.guest?.phone ?? '-'),
    resident: isCareEnv ? quoteValue(ticket.guest?.resident ?? '-') : undefined,
    providedHealthDocument: company.needToShowCoronaTest
      ? providedHealthDocumentToString(ticket.guest?.providedHealthDocument)
      : undefined,
  }))
  const header = {
    enteredAt: 'Eingecheckt um',
    leftAt: 'Ausgecheckt um',
    areaName: 'Bereich',
    name: 'Name',
    address: 'Adresse',
    phone: 'Telefon',
  }

  if (company.needToShowCoronaTest)
    header['providedHealthDocument'] = 'Vorgelegtes Dokument'

  if (isCareEnv) header['resident'] = 'Bewohnername'

  return [header, ...downloadableTickets]
}

const DataRequestPage: React.FC<WithOwnerProps> = ({ owner }) => {
  const { query } = useRouter()
  const { data: companies } = useCompanies()
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

  const { tickets, successCount, errorCount, pendingCount } =
    React.useMemo(() => {
      const encryptedTickets = dataRequest?.tickets || []
      const { publicKey, privateKey } = owner
      return decryptTickets(encryptedTickets, publicKey, privateKey)
    }, [dataRequest, owner])

  const handleDownload = React.useCallback(async () => {
    setLoading(true)
    const rows = ticketsToExcel(company, tickets)

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

  const twoHoursBefore = new Date()
  twoHoursBefore.setHours(new Date().getHours() - 2)

  const approveRequest = React.useCallback(async () => {
    if (didDecrypt) {
      const json = {
        method: 'submitGuestList',
        jsonrpc: '2.0',
        id: uuidv4(),
        params: {
          _client: {
            name: 'Recover',
          },
          dataAuthorizationToken: dataRequest.irisDataAuthorizationToken,
          guestList: {
            dataProvider: {
              name: company.name,
              address: {
                street: company.street.split(',')[0],
                houseNumber: company.street.split(',')[1],
                zipCode: company.zip,
                city: company.city,
              },
            },

            startDate: dataRequest.from,
            endDate: dataRequest.to,
            additionalInformation: dataRequest.reason,
            guests: tickets.map((ticket) => {
              const result = {
                lastName: ticket.guest.name,
                phone: ticket.guest.phone,
                address: {
                  street: ticket.guest.address,
                },
                attendanceInformation: {
                  attendFrom: ticket.enteredAt,
                  attendTo: ticket.leftAt,
                  additionalInformation: ticket.areaName,
                },
              }
              return result
            }),
          },
        },
      }

      return await ky
        .post(`https://${dataRequest.proxyEndpoint}:32325`, { json })
        .json()
        .then((res) => {
          if (res['result'] == 'OK') {
            postAcceptDataRequest(dataRequestId).then(() => {
              queryCache.find(['dataRequests', companyId, dataRequestId])
              queryCache.find(['unacceptedDataRequests'])
              alert('Ihre Kundenkontaktdaten wurden erfolgreich übermittelt')
              companies
            })
          } else {
            console.log(res)
          }
        })
    }
  }, [didDecrypt, tickets, company, dataRequest])

  

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

      {dataRequest &&
        !dataRequest.acceptedAt &&
        pendingCount === 0 &&
        errorCount === 0 && (
          <>
            <Callout variant="danger">
              <Text>
                {isFormal ? 'Sie' : 'Du'} hast diese Daten noch nicht für das
                Gesundheitsamt freigegeben. Sobald{' '}
                {isFormal
                  ? 'sie diese Daten freigeben'
                  : 'du diese Daten freigibst'}
                , werden diese verschlüsselt an das Gesundheitsamt gesendet.
              </Text>
              <Box height={4} />
              <Text as="h2">Anfragende Behörde:</Text>
              <Text>{dataRequest.irisClientName}</Text>
              <Box height={4} />
              {dataRequest.reason && (
                <>
                  <Text as="h2">Grund der Anfrage:</Text>
                  <Text>{dataRequest.reason}</Text>
                  <Box height={4} />
                </>
              )}
              <Button onClick={approveRequest}>Daten freigeben</Button>
            </Callout>
            <Box height={4} />
          </>
        )}

      {dataRequest?.tickets && !owner.privateKey && (
        <Box mb={4}>
          <Text>
            {isFormal
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
                  {isFormal ? 'Ihre' : 'dein'} privater Schlüssel nicht korrekt.
                  Bitte {isFormal ? 'geben Sie' : 'gib'} ihn neu ein.
                </Text>
              </Callout>
              <Box height={4} />
              <Button type="button" onClick={handleEnterKey}>
                Schlüssel neu eingeben
              </Button>
            </>
          )}
          <FlexibleRow>
            <FlexibleRowStart>
              <Box height={4} />
              <Button onClick={handleDownload}>Download als Excel</Button>
            </FlexibleRowStart>

            <FlexibleRowEnd>
              <InfoRowItem>
                <FilledCircle variant="cyan" />
                Kontaktdaten der letzten 2 Stunden für das Ordnungsamt
              </InfoRowItem>
              <InfoRowItem>
                <FilledCircle variant="lilac" />
                Ältere Kontaktdaten für Abfragen des Gesundheitsamt
              </InfoRowItem>
            </FlexibleRowEnd>
          </FlexibleRow>
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
              {company?.needToShowCoronaTest && <th>Vorgelegtes Dokument</th>}
              {isCareEnv && <th>Bewohner</th>}
            </tr>
          </thead>
          <tbody>
            {sortTickets(tickets).map((ticket) => (
              <tr
                key={ticket.id}
                css={css({
                  bg:
                    ticket.leftAt >= twoHoursBefore ? 'cyan.100' : 'lilac.100',
                })}
              >
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
                    {company?.needToShowCoronaTest && (
                      <td>
                        {providedHealthDocumentToString(
                          ticket.guest.providedHealthDocument
                        )}
                      </td>
                    )}
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

const FlexibleRow = styled('div')(
  css({
    display: ['block', 'block', 'flex'],
  })
)

const FlexibleRowStart = styled('div')(
  css({
    flexGrow: 1,
  })
)

const FlexibleRowEnd = styled('div')(
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  })
)

const InfoRowItem = styled('div')(
  css({
    display: 'flex',
    alignItems: 'center',
    '&:first-of-type': {
      paddingTop: 4,
      paddingBottom: 2,
    },
  })
)
export default withOwner()(DataRequestPage)
