import { useQuery } from 'react-query'
import { getArea, AreaRes } from '../api'

async function fetchArea(_key: unknown, areaId: string): Promise<AreaRes> {
  return await getArea(areaId)
}

export function useArea(areaId?: string) {
  return useQuery(areaId && ['areas', areaId], fetchArea)
}
