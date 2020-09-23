import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'
import { api } from './'

export interface AreaPatch {
  name: string
}

export interface AreaPost {
  name: string
  companyId: string
}

export interface AreaRes {
  id: string
  name: string
  companyId: string
  companyName: string
  menuLink?: string
  menuAlias?: string
  ownerIsBlocked: boolean
  frontendUrl: string
}

export async function getArea(id: AreaRes['id']): Promise<AreaRes> {
  return await api
    .get(`areas/${id}`)
    .json()
    .then((res: AreaRes) => camelcaseKeys(res, { deep: true }))
}

export async function postArea(area: AreaPost): Promise<AreaRes> {
  const { companyId, ...changes } = area
  const json = snakecaseKeys({ area: changes }, { deep: true })

  return await api
    .post(`companies/${companyId}/areas`, { json })
    .json()
    .then((res: AreaRes) => camelcaseKeys(res, { deep: true }))
}

export async function patchArea(id: string, area: AreaPatch): Promise<AreaRes> {
  const json = snakecaseKeys({ area }, { deep: true })

  return await api
    .patch(`areas/${id}`, { json })
    .json()
    .then((res: AreaRes) => camelcaseKeys(res, { deep: true }))
}
