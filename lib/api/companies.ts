import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'
import { api, AreaRes } from './'

export interface CompanyReq {
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

export async function getCompany(id: string): Promise<CompanyRes> {
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

export async function patchCompany(
  id: string,
  company: CompanyReq
): Promise<CompanyRes> {
  const json = snakecaseKeys({ company }, { deep: true })

  return await api
    .patch(`companies/${id}`, { json })
    .json()
    .then((res: CompanyRes) => camelcaseKeys(res, { deep: true }))
}
