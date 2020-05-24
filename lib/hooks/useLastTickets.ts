import * as React from 'react'
import { useQuery } from 'react-query'
import { subHours } from 'date-fns'
import { getTickets, CompanyTicketRes } from '@lib/api'

async function fetchLastTickets(
  _key: unknown,
  companyId: string
): Promise<CompanyTicketRes[]> {
  const to = new Date()
  const from = new Date(subHours(to, 6))
  return await getTickets({ companyId, from, to })
}

export function useLastTickets(companyId?: string) {
  return useQuery(companyId && ['tickets', companyId], fetchLastTickets, {
    refetchInterval: 10000,
  })
}

type GroupedTickets = {
  [key: string]: {
    open: CompanyTicketRes[]
    closed: CompanyTicketRes[]
  }
}

export function useLastTicketsGrouped(companyId?: string) {
  const { data, ...rest } = useLastTickets(companyId)
  const groupedData = React.useMemo(() => {
    return data?.reduce((acc, ticket) => {
      if (!acc[ticket.areaId]) acc[ticket.areaId] = { open: [], closed: [] }
      if (ticket.leftAt) acc[ticket.areaId].closed.push(ticket)
      else acc[ticket.areaId].open.push(ticket)
      return acc
    }, {} as GroupedTickets)
  }, [data])

  return { data: groupedData, ...rest }
}

export function useLastAreaTickets(companyId?: string, areaId?: string) {
  const { data, ...rest } = useLastTickets(companyId)
  const filteredData = React.useMemo(() => {
    return data?.filter((ticket) => ticket.areaId === areaId)
  }, [data, areaId])

  return { data: filteredData, ...rest }
}
