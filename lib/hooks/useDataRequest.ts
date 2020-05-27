import { useQuery } from 'react-query'
import { getDataRequest, DataRequestRes } from '../api'

async function fetchDataRequest(
  _key: unknown,
  _companyId: string,
  id: string
): Promise<DataRequestRes> {
  return await getDataRequest(id)
}

export function useDataRequest(companyId?: string, dataRequestId?: string) {
  return useQuery(
    companyId && dataRequestId && ['dataRequests', companyId, dataRequestId],
    fetchDataRequest,
    { refetchOnWindowFocus: false }
  )
}
