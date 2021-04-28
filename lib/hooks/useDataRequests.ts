import { useQuery } from 'react-query'
import { getDataRequests, DataRequestRes } from '../api'

async function fetchDataRequests({ queryKey }): Promise<DataRequestRes[]> {
  const [_key, id] = queryKey
  return await getDataRequests(id)
}

export function useDataRequests(companyId?: string) {
  return useQuery(companyId && ['dataRequests', companyId], fetchDataRequests)
}
