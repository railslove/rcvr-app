import { useQuery } from 'react-query'
import { getCompanies } from '../api'

export function useCompanies() {
  return useQuery('companies', getCompanies)
}
