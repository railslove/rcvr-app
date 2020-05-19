import camelcaseKeys from 'camelcase-keys' // eslint-disable-line import/default
import snakecaseKeys from 'snakecase-keys'
import { api } from './'

export interface PostSignup {
  email: string
  password: string
  name: string
  affiliate: string
}

export interface PostLogin {
  email: string
  password: string
}

export interface OwnerRes {
  id: number
  email: string
  name: string
  publicKey?: string
}

export interface OwnerReq {
  id?: number
  publicKey?: string
}

export async function postSignup(signup: PostSignup): Promise<OwnerRes> {
  const json = snakecaseKeys({ owner: signup }, { deep: true })

  return await api
    .post('signup', { json })
    .json()
    .then((res: OwnerRes) => camelcaseKeys(res, { deep: true }))
}

export async function postLogin(login: PostLogin): Promise<OwnerRes> {
  const json = snakecaseKeys({ owner: login }, { deep: true })

  return await api
    .post('login', { json })
    .json()
    .then((res: OwnerRes) => camelcaseKeys(res, { deep: true }))
}

export async function getOwner(): Promise<OwnerRes> {
  return await api
    .get('owner')
    .json()
    .then((res: OwnerRes) => camelcaseKeys(res, { deep: true }))
}

export async function patchOwner(owner: OwnerReq): Promise<OwnerRes> {
  const json = snakecaseKeys({ owner }, { deep: true })

  return await api
    .patch('owner', { json })
    .json()
    .then((res: OwnerRes) => camelcaseKeys(res, { deep: true }))
}
