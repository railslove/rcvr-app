import { useMutation } from 'react-query'
import { checkin } from '../actions'

export function useCheckin() {
  const [checkinFn, { error }] = useMutation(checkin, { throwOnError: true })
  if (error) throw error

  return checkinFn
}
