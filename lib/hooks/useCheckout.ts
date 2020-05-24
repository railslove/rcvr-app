import { useMutation } from 'react-query'
import { checkout } from '../actions'

export function useCheckout() {
  const [checkoutFn, { error }] = useMutation(checkout, { throwOnError: true })
  if (error) throw error

  return checkoutFn
}
