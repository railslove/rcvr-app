import { useQuery } from 'react-query'
import { getCompany, CompanyRes } from '@lib/api'

async function fetchCompany(_key: unknown, id: string): Promise<CompanyRes> {
  return await getCompany(id)
}

export function useCompany(companyId?: string) {
  return useQuery(companyId && ['companies', companyId], fetchCompany)
}
