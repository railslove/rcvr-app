import { useQuery } from 'react-query'
import { getCurrentGuest } from '@lib/db'

export function useCurrentGuest() {
  return useQuery('currentGuest', getCurrentGuest)
}
