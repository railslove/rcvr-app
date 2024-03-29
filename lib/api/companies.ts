import camelcaseKeys from 'camelcase-keys'
import { api, AreaRes } from './'

export interface CompanyReq extends FormData {
  'company[name]'?: FormDataEntryValue
  'company[need_to_show_corona_test]'?: FormDataEntryValue
  'company[menu_link]'?: FormDataEntryValue
  'company[menu_alias]'?: FormDataEntryValue
  'company[privacy_policy_link]'?: FormDataEntryValue
  'company[menu_pdf]'?: File
  'company[cwa_link_enabled]'?: FormDataEntryValue
  'company[cwa_crypto_seed]'?: FormDataEntryValue
}

export const CompanyTypeOptions = {
  food_service: 'Gastronomiebetrieb',
  craft: 'Handwerksbetrieb',
  retail: 'Einzelhandel',
  workplace: 'Arbeitsstätte',
  educational_institution: 'Bildungsstätte',
  public_building: 'öffentliches Gebäude',
  other: 'Anderes',
}

export const CoronaTestOptions = {
  0: 'NO_TEST',
  1: 'RECOVERED_OR_VACCINATED',
  24: '24_HOUR_TEST_NEEDED',
  48: '48_HOUR_TEST_NEEDED',
} as const

export type CoronaTestOptionsValues =
  typeof CoronaTestOptions[keyof typeof CoronaTestOptions]

export interface CompanyRes {
  id: string
  name: string
  street: string
  zip: string
  city: string
  needToShowCoronaTest: number
  menuLink?: string
  menuAlias?: string
  privacyPolicyLink?: string
  menuPdfLink?: string
  areas: AreaRes[]
  cwaLinkEnabled: boolean
  cwaCryptoSeed?: string
  locationType: string
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
