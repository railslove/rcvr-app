import { useQuery } from 'react-query'
import { getUnacceptedDataRequests, UnacceptedDataRequestsRes } from '../api'

const CHECK_DATA_REQUEST_TIMEOUT = 10 * 60 * 1000

async function fetchUnacceptedDataRequests(
  _key: unknown
): Promise<UnacceptedDataRequestsRes> {
  return await getUnacceptedDataRequests()
}

export function useUnacceptedDataRequests() {
  return useQuery(['unacceptedDataRequests'], fetchUnacceptedDataRequests, {
    refetchInterval: CHECK_DATA_REQUEST_TIMEOUT,
  })
}
