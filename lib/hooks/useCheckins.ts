import { useQuery } from 'react-query'
import { getVisibleCheckins } from '@lib/db'

export function useCheckins() {
  return useQuery('checkins', getVisibleCheckins)
}
