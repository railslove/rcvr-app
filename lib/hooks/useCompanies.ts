import { useQuery } from 'react-query'
import { getCompanies } from '@lib/api'

export function useCompanies() {
  return useQuery('companies', getCompanies)
}
