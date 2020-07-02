import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'
import { api, parseDates } from './'

export interface PostSignup {
  email: string
  password: string
  name: string
  affiliate?: string
}

export interface PostLogin {
  email: string
  password: string
}

export interface OwnerRes {
  id: number
  email: string
  name: string
  canUseForFree: boolean
  publicKey?: string
  affiliate?: string
  trialEndsAt?: Date
  stripeSubscriptionStatus?:
    | 'trialing'
    | 'active'
    | 'incomplete'
    | 'incomplete_expired'
    | 'canceled'
    | 'unpaid'
}

export interface OwnerReq {
  id?: number
  publicKey?: string
  foo?: string
}

export async function postSignup(signup: PostSignup): Promise<OwnerRes> {
  const frontend = { url: 'https://rcvr.app' }
  const json = snakecaseKeys({ owner: signup, frontend }, { deep: true })

  return await api
    .post('signup', { json })
    .json()
    .then((res: object) => camelcaseKeys(res, { deep: true }))
    .then((res: object) => parseDates<OwnerRes>(res, 'trialEndsAt'))
}

export async function postLogin(login: PostLogin): Promise<OwnerRes> {
  const json = snakecaseKeys({ owner: login }, { deep: true })

  return await api
    .post('login', { json })
    .json()
    .then((res: object) => camelcaseKeys(res, { deep: true }))
    .then((res: object) => parseDates<OwnerRes>(res, 'trialEndsAt'))
}

export async function getOwner(): Promise<OwnerRes> {
  return await api
    .get('owner')
    .json()
    .then((res: object) => camelcaseKeys(res, { deep: true }))
    .then((res: object) => parseDates<OwnerRes>(res, 'trialEndsAt'))
}

export async function patchOwner(owner: OwnerReq): Promise<OwnerRes> {
  const json = snakecaseKeys({ owner }, { deep: true })

  return await api
    .patch('owner', { json })
    .json()
    .then((res: object) => camelcaseKeys(res, { deep: true }))
    .then((res: object) => parseDates<OwnerRes>(res, 'trialEndsAt'))
}

export interface OwnerCheckoutRes {
  id: string
}

export async function postOwnerCheckout(): Promise<OwnerCheckoutRes> {
  return await api
    .post('checkout')
    .json()
    .then((res: OwnerCheckoutRes) => camelcaseKeys(res, { deep: true }))
}

export interface SubscriptionRes {
  url: string
}

export async function postOwnerSubscription(): Promise<SubscriptionRes> {
  return await api
    .post('subscription-settings')
    .json()
    .then((res: SubscriptionRes) => camelcaseKeys(res, { deep: true }))
}
