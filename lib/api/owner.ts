import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'
import { api, parseDates } from './'

export interface PostSignup {
  email: string
  companyName: string
  phone: string
  password: string
  name: string
  street: string
  zip: string
  city: string
  affiliate?: string
}

export interface PostLogin {
  email: string
  password: string
}

export interface PostSepaSubscription {
  token: string
}

export interface OwnerRes {
  id: number
  email: string
  name: string
  companyName: string
  phone: string
  street: string
  zip: string
  city: string
  canUseForFree: boolean
  publicKey?: string
  affiliate?: string
  trialEndsAt?: Date
  blockAt?: Date
  menuAlias?: string
  stripeSubscriptionStatus?:
    | 'trialing'
    | 'active'
    | 'incomplete'
    | 'incomplete_expired'
    | 'canceled'
    | 'unpaid'
}

export interface OwnerReq {
  name?: string
  companyName?: string
  phone?: string
  street?: string
  zip?: string
  city?: string
  publicKey?: string
}

export async function postSignup(signup: PostSignup): Promise<OwnerRes> {
  const FRONTEND_URLS = {
    rcvr: 'https://rcvr.app',
    care: 'https://care.rcvr.app',
  }
  const frontend = {
    url:
      process.env.NEXT_PUBLIC_OVERWRITE_FRONTEND_URL ||
      FRONTEND_URLS[process.env.NEXT_PUBLIC_BUILD_VARIANT],
  }
  const json = snakecaseKeys({ owner: signup, frontend }, { deep: true })

  return await api
    .post('signup', { json })
    .json()
    .then((res: object) => camelcaseKeys(res, { deep: true }))
    .then((res: object) => parseDates<OwnerRes>(res, 'trialEndsAt', 'blockAt'))
}

export async function postLogin(login: PostLogin): Promise<OwnerRes> {
  const json = snakecaseKeys({ owner: login }, { deep: true })

  return await api
    .post('login', { json })
    .json()
    .then((res: object) => camelcaseKeys(res, { deep: true }))
    .then((res: object) => parseDates<OwnerRes>(res, 'trialEndsAt', 'blockAt'))
}

export async function getOwner(): Promise<OwnerRes> {
  return await api
    .get('owner')
    .json()
    .then((res: object) => camelcaseKeys(res, { deep: true }))
    .then((res: object) => parseDates<OwnerRes>(res, 'trialEndsAt', 'blockAt'))
}

export async function patchOwner(owner: OwnerReq): Promise<OwnerRes> {
  const json = snakecaseKeys({ owner }, { deep: true })

  return await api
    .patch('owner', { json })
    .json()
    .then((res: object) => camelcaseKeys(res, { deep: true }))
    .then((res: object) => parseDates<OwnerRes>(res, 'trialEndsAt', 'blockAt'))
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

export interface OwnerStripeIntentRes {
  id: string
}

export async function postOwnerStripeIntent(): Promise<OwnerCheckoutRes> {
  return await api
    .post('setup_intent')
    .json()
    .then((res: OwnerStripeIntentRes) => camelcaseKeys(res, { deep: true }))
}

export async function postSepaSubscription(
  sepaSubscription: PostSepaSubscription
): Promise<null> {
  const json = snakecaseKeys(sepaSubscription, { deep: true })
  return await api.post('sepa_subscription', { json }).json()
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
