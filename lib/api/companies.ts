import camelcaseKeys from 'camelcase-keys'
import { api, AreaRes } from './'

export interface CompanyReq extends FormData {
  'company[name]'?: FormDataEntryValue
  'company[need_to_show_corona_test]'?: FormDataEntryValue
  'company[menu_link]'?: FormDataEntryValue
  'company[privacy_policy_link]'?: FormDataEntryValue
  'company[menu_pdf]'?: File
}

export interface CompanyRes {
  id: string
  name: string
  street: string
  zip: string
  city: string
  needToShowCoronaTest: boolean
  menuLink?: string
  privacyPolicyLink?: string
  menuPdfLink?: string
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
  return await api
    .post('companies', { body: company })
    .json()
    .then((res: CompanyRes) => camelcaseKeys(res, { deep: true }))
}

export async function patchCompany(
  id: string,
  company: CompanyReq
): Promise<CompanyRes> {
  return await api
    .patch(`companies/${id}`, { body: company })
    .json()
    .then((res: CompanyRes) => camelcaseKeys(res, { deep: true }))
}
