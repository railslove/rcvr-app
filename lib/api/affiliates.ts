import camelcaseKeys from 'camelcase-keys'
import { api } from './'

export interface Affiliate {
  name: string
  logoUrl?: string
}

export async function findAffiliateByCode(code: string): Promise<Affiliate> {
  return api
    .get(`affiliates/${code}`)
    .json()
    .then((res: Affiliate) => camelcaseKeys(res, { deep: true }))
}
