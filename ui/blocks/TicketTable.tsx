import * as React from 'react'
import type { CompanyTicketResponse } from '@lib/api'
import { Text } from '@ui/base'
import formatDate from 'intl-dateformat'

type TicketTableProps = {
  tickets?: CompanyTicketResponse[]
}

const TicketTable: React.FC<TicketTableProps> = ({ tickets }) => {
  if (!tickets)
    return (
      <Text color="bluegrey.800" textAlign="center">
        Lade...
      </Text>
    )

  return (
    <table
      css={{
        width: '100%',
        overflowWrap: 'break-word',
        fontSize: 13,
      }}
      cellPadding="0"
      cellSpacing="0"
    >
      <thead>
        <tr css={{ fontWeight: 500 }}>
          <td css={{ padding: '12px 4px', paddingLeft: 32 }}>Bereich</td>
          <td css={{ padding: '12px 4px' }}>Check in</td>
          <td css={{ padding: '12px 4px' }}>out</td>
          <td css={{ padding: '12px 4px', paddingRight: 32 }}>Kundendaten</td>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr
            key={ticket.id}
            css={{ fontWeight: 700, td: { borderTop: '1px solid #DFEAEB' } }}
          >
            <td css={{ padding: '12px 4px', paddingLeft: 32 }}>
              {ticket.areaName}
            </td>
            <td css={{ padding: '12px 4px' }}>
              {formatDate(new Date(ticket.enteredAt), 'DD.MM. HH:mm')}
            </td>
            <td css={{ padding: '12px 4px' }}>
              {ticket.leftAt
                ? formatDate(new Date(ticket.leftAt), 'HH:mm')
                : '–'}
            </td>
            <td css={{ padding: '12px 4px', paddingRight: 32 }}>
              verschlüsselt
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TicketTable
