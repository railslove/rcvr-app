import { useQuery } from 'react-query'
import { getCompany, CompanyRes } from '../api'

async function fetchCompany({ queryKey }): Promise<CompanyRes> {
  const [_key, id] = queryKey
  return await getCompany(id)
}

export function useCompany(companyId?: string) {
  return useQuery(companyId && ['companies', companyId], fetchCompany)
}
