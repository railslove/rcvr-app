import { useQuery } from 'react-query'
import { getVisibleCheckins } from '../db'

export function useCheckins() {
  return useQuery('checkins', getVisibleCheckins)
}
