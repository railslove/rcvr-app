import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import formatDate from 'intl-dateformat'
import ky from 'ky-universal'
import { useRouter } from 'next/router'
import * as React from 'react'
import { QueryCache } from 'react-query'
import { useEffectOnce } from 'react-use'
import { v4 as uuidv4 } from 'uuid'
import { DecryptedTicket, decryptTickets } from '~lib/actions'
import { CompanyRes, postAcceptDataRequest } from '~lib/api'
import { isCareEnv, isFormal } from '~lib/config'
import { GuestHealthDocumentEnum } from '~lib/db'
import { useCompany, useDataRequest, useModals } from '~lib/hooks'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { Loading } from '~ui/blocks/Loading'
import { Box, Button, Callout, Table, Text } from '~ui/core'
import { FilledCircle } from '~ui/core/FilledCircle'
import { BackLink, OwnerApp } from '~ui/layouts/OwnerApp/OwnerApp'
import { RedirectModal } from '~ui/modals/RedirectModal'
import { PrivateKeyModal } from '~ui/modals/PrivateKeyModal'
import usePageLocale from '~locales/usePageLocale'

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

type DownloadFileMessages = {
  tested: string
  recovering: string
  vaccinated: string
  contactData: string
  customerContactData: string
  customerContactDataFrom: string
  headerName: string
  headerPhone: string
  headerLeftAt: string
  headerAddress: string
  headerAreaName: string
  headerEnteredAt: string
  headerResidents: string
  headerProvidedHealthDocument: string
}

const providedHealthDocumentToString = (
  value: string,
  messages: DownloadFileMessages
) => {
  switch (value) {
    case GuestHealthDocumentEnum.hadCorona:
      return messages.recovering

    case GuestHealthDocumentEnum.vaccinated:
      return messages.vaccinated

    case GuestHealthDocumentEnum.tested:
      return messages.tested

    default:
      return ''
  }
}

const queryCache = new QueryCache({
  onError: (error) => {
    console.log(error)
  },
})

const ticketsToExcel = (
  company: CompanyRes,
  tickets: DecryptedTicket[],
  messages: DownloadFileMessages
) => {
  const downloadableTickets = sortTickets(tickets).map((ticket) => ({
    enteredAt: formatDate(ticket.enteredAt, 'DD.MM.YYYY HH:mm'),
    leftAt: ticket.leftAt ? formatDate(ticket.leftAt, 'DD.MM.YYYY HH:mm') : '-',
    areaName: quoteValue(ticket.areaName),
    name: quoteValue(ticket.guest?.name ?? '-'),
    address: quoteValue(ticket.guest?.address ?? '-'),
    phone: quoteValue(ticket.guest?.phone ?? '-'),
    resident: isCareEnv ? quoteValue(ticket.guest?.resident ?? '-') : undefined,
    providedHealthDocument: company.needToShowCoronaTest
      ? providedHealthDocumentToString(
          ticket.guest?.providedHealthDocument,
          messages
        )
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
  const { t } =
    usePageLocale<'business/company/[companyId]/data-request/[dataRequestId]'>()
  const { query } = useRouter()
  const companyId = query.companyId.toString()
  const dataRequestId = query.dataRequestId.toString()
  const { data: company } = useCompany(companyId)
  const { data: dataRequest, status } = useDataRequest(companyId, dataRequestId)
  const [loading, setLoading] = React.useState(false)
  const { modals, openModal } = useModals({
    privateKey: PrivateKeyModal,
    success: RedirectModal,
  })

  const headerMessages = React.useMemo(
    () => ({
      headerFrom: t('headerFrom'),
      headerName: t('headerName'),
      headerPhone: t('headerPhone'),
      headerUntil: t('headerUntil'),
      headerLeftAt: t('headerLeftAt'),
      headerAddress: t('headerAddress'),
      headerAreaName: t('headerAreaName'),
      headerEnteredAt: t('headerEnteredAt'),
      headerResidents: t('headerResidents'),
      headerProvidedHealthDocument: t('headerProvidedHealthDocument'),
    }),
    [t]
  )

  const downloadFileMessages: DownloadFileMessages = React.useMemo(
    () => ({
      tested: t('tested'),
      vaccinated: t('vaccinated'),
      recovering: t('recovering'),
      contactData: t('contactData'),
      customerContactData: t('customerContactData'),
      customerContactDataFrom: t('customerContactDataFrom'),
      ...headerMessages,
    }),
    [t, headerMessages]
  )

  const {
    headerName,
    headerFrom,
    headerUntil,
    headerPhone,
    headerAddress,
    headerAreaName,
    headerResidents,
    headerProvidedHealthDocument,
  } = headerMessages

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
    const rows = ticketsToExcel(company, tickets, downloadFileMessages)

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

    writeFile(
      book,
      `${downloadFileMessages.contactData} ${company?.name} ${date}.xlsx`
    )
    setLoading(false)
  }, [tickets, company, dataRequest, downloadFileMessages])

  const dateRange =
    dataRequest?.from && dataRequest?.to
      ? formatDate(dataRequest.from, 'DD.MM.YYYY HH:mm') +
        ' – ' +
        formatDate(dataRequest.to, 'DD.MM.YYYY HH:mm')
      : ''

  const title = dateRange
    ? `${downloadFileMessages.customerContactDataFrom} ${dateRange}`
    : downloadFileMessages.customerContactData

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
              openModal('success', {
                returnUrl: `/business/company/${companyId}`,
                text: 'Die Kontaktdaten wurden erfolgreich übermittelt',
                title: 'Anfrage vom Gesundheitsamt',
              })
            })
          } else {
            console.log(res)
          }
        })
    }
  }, [
    didDecrypt,
    tickets,
    company,
    dataRequest,
    dataRequestId,
    companyId,
    openModal,
  ])

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
      {status !== 'success' && <Text variant="shy">{t('loading')}</Text>}

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
          <Text>{t('enterKeyMessage')}</Text>
          <Box height={4} />
          <Button onClick={handleEnterKey}>{t('enterKeyButtonText')}</Button>
        </Box>
      )}

      {didDecrypt && (
        <Box>
          <Text variant="shy">
            {successCount} {t('checkinsDecoded')}
          </Text>
          {errorCount > 0 && (
            <Text variant="shy">
              {errorCount} {t('checkinsErrorCountText')}
            </Text>
          )}
          <Box height={4} />
          {successCount === 0 && errorCount > 0 && (
            <>
              <Callout variant="danger">
                <Text>{t('checkinsErrorCountMessage')}</Text>
              </Callout>
              <Box height={4} />
              <Button type="button" onClick={handleEnterKey}>
                {t('enterNewKeyButtonText')}
              </Button>
            </>
          )}
          <FlexibleRow>
            <FlexibleRowStart>
              <Box height={4} />
              <Button onClick={handleDownload}>{t('downloadAsExcel')}</Button>
            </FlexibleRowStart>

            <FlexibleRowEnd>
              <InfoRowItem>
                <FilledCircle variant="cyan" />
                {t('contactsFromLastHours')}
              </InfoRowItem>
              <InfoRowItem>
                <FilledCircle variant="lilac" />
                {t('olderContactRequests')}
              </InfoRowItem>
            </FlexibleRowEnd>
          </FlexibleRow>
        </Box>
      )}

      <Box mx={-4} p={4} css={{ overflow: 'scroll' }}>
        <Table css={{ maxWidth: '100%' }}>
          <thead>
            <tr>
              <th>{headerFrom}</th>
              <th>{headerUntil}</th>
              <th>{headerAreaName}</th>
              <th>{headerName}</th>
              <th>{headerAddress}</th>
              <th>{headerPhone}</th>
              {company?.needToShowCoronaTest && (
                <th>{headerProvidedHealthDocument}</th>
              )}
              {isCareEnv && <th>{headerResidents}</th>}
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
                  <td colSpan={3}>{t('stillEncrypted')}</td>
                )}
                {ticket.decryptionStatus === 'error' && (
                  <td colSpan={3}>{t('notDecodable')}</td>
                )}
                {ticket.decryptionStatus === 'success' && (
                  <>
                    <td>{ticket.guest.name}</td>
                    <td>{ticket.guest.address}</td>
                    <td>{ticket.guest.phone}</td>
                    {company?.needToShowCoronaTest && (
                      <td>
                        {providedHealthDocumentToString(
                          ticket.guest.providedHealthDocument,
                          downloadFileMessages
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
