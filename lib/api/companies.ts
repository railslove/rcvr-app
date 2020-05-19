import camelcaseKeys from 'camelcase-keys' // eslint-disable-line import/default
import snakecaseKeys from 'snakecase-keys'
import { api, AreaRes } from './'

export interface CompanyReq {
  id: string
  name?: string
  menuLink?: string
}

export interface CompanyRes {
  id: string
  name: string
  menuLink?: string
  areas: AreaRes[]
}

export async function getCompanies(): Promise<CompanyRes[]> {
  return await api
    .get('companies')
    .json()
    .then((res: CompanyRes[]) => camelcaseKeys(res, { deep: true }))
}

export async function getCompany(id: CompanyReq['id']): Promise<CompanyRes> {
  return await api
    .get(`companies/${id}`)
    .json()
    .then((res: CompanyRes) => camelcaseKeys(res, { deep: true }))
}

export async function postCompany(company: CompanyReq): Promise<CompanyRes> {
  const json = snakecaseKeys({ company }, { deep: true })

  return await api
    .post('companies', { json })
    .json()
    .then((res: CompanyRes) => camelcaseKeys(res, { deep: true }))
}

export async function patchCompany(company: CompanyReq): Promise<CompanyRes> {
  const { id, ...changes } = company
  const json = snakecaseKeys({ company: changes }, { deep: true })

  return await api
    .post(`companies/${id}`, { json })
    .json()
    .then((res: CompanyRes) => camelcaseKeys(res, { deep: true }))
}
