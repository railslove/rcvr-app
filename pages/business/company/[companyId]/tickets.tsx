import * as React from 'react'
import Link from 'next/link'
import { fetchCompany, fetchTickets } from '@lib/api'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { subHours } from 'date-fns'
import { Callout, Text, Box, Button } from '@ui/base'
import BusinessPageSwitcher from '@ui/blocks/BusinessPageSwitcher'
import TicketTable from '@ui/blocks/TicketTable'
import BusinessLayout from '@ui/layouts/Business'

type CompanyPageProps = {}

const CompanyPage: React.FC<CompanyPageProps> = () => {
  const router = useRouter()
  const companyId = router.query.companyId?.toString()
  const [ticketsTo, _setTicketsTo] = React.useState(new Date())
  const [ticketsFrom, _setTicketsFrom] = React.useState(subHours(ticketsTo, 5))

  const { data: company } = useQuery(
    companyId && ['company', companyId],
    (_key, cid) => fetchCompany(cid)
  )

  const { data: tickets } = useQuery(
    companyId && ['tickets', { companyId, from: ticketsFrom, to: ticketsTo }],
    (_key, { companyId, from, to }) =>
      fetchTickets({ companyId, from: new Date(from), to: new Date(to) })
  )

  if (!company) return <BusinessLayout loading />

  return (
    <BusinessLayout title={company.name}>
      <BusinessPageSwitcher companyId={company.id} active="tickets" />
      <Callout>
        Anfragen zu Kundenkontaktdaten kannst du aktuell per Email an{' '}
        <a href="mailto:team@recoverapp.de">team@recoverapp.de</a> stellen. Wir
        melden uns schnellstmöglich bei dir.
        <br />
        Wir arbeiten an einem automatisierten Prozess dafür.
      </Callout>
      <Box my={4}>
        <Link href="/business/decrypt">
          <a>
            <Button title="Daten entschlüsseln" />
          </a>
        </Link>
      </Box>
      <Text as="h2" fontSize="md" mt={4} mb={2}>
        Letzte Check-ins
      </Text>
      <Box mx={-4} my={2}>
        <TicketTable tickets={tickets} />
      </Box>
    </BusinessLayout>
  )
}

export default CompanyPage
