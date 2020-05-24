import { useQuery } from 'react-query'
import { getCurrentGuest } from '../db'

export function useCurrentGuest() {
  return useQuery('currentGuest', getCurrentGuest)
}
