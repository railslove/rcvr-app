import camelcaseKeys from 'camelcase-keys'
import { api } from './'

export interface PortalSessionRes {
  url: string
}

export async function postBillingPortalSession(): Promise<PortalSessionRes> {
  return await api
    .post('stripe_billing_portal_session')
    .json()
    .then((res: PortalSessionRes) => camelcaseKeys(res, { deep: true }))
}
