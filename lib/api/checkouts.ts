import camelcaseKeys from 'camelcase-keys'
import { api } from './'

export interface CheckoutRes {
  id: string
}

export async function postCheckout(): Promise<CheckoutRes> {
  return await api
    .post('checkout')
    .json()
    .then((res: CheckoutRes) => camelcaseKeys(res, { deep: true }))
}
