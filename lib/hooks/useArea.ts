import { useQuery } from 'react-query'
import { getArea, AreaRes } from '../api'

async function fetchArea({ queryKey }): Promise<AreaRes> {
  const [_key, areaId] = queryKey
  return await getArea(areaId)
}

export function useArea(areaId?: string) {
  return useQuery(areaId && ['areas', areaId], fetchArea)
}
