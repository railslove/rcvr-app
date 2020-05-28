import { useQuery } from 'react-query'
import { getDataRequests, DataRequestRes } from '../api'

async function fetchDataRequests(
  _key: unknown,
  id: string
): Promise<DataRequestRes[]> {
  return await getDataRequests(id)
}

export function useDataRequests(companyId?: string) {
  return useQuery(companyId && ['dataRequests', companyId], fetchDataRequests)
}
