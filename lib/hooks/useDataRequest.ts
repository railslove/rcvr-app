import { useQuery } from 'react-query'
import { getDataRequest, DataRequestRes } from '../api'

async function fetchDataRequest({ queryKey }): Promise<DataRequestRes> {
  const [_key, _companyId, id] = queryKey
  return await getDataRequest(id)
}

export function useDataRequest(companyId?: string, dataRequestId?: string) {
  return useQuery(
    companyId && dataRequestId && ['dataRequests', companyId, dataRequestId],
    fetchDataRequest,
    { refetchOnWindowFocus: false }
  )
}
