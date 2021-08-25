import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export const LOCAL_STORAGE_AFFILIATE_KEY = 'rcvr_affiliate'

export const useAffiliate = () => {
  const { query } = useRouter()
  const [affiliateName, setAffiliateName] = useState<string>()
  const [isAffiliate, setAffiliate] = useState<boolean>(false)

  useEffect(() => {
    const savedAffiliateName = localStorage.getItem(LOCAL_STORAGE_AFFILIATE_KEY)

    if (!savedAffiliateName && query.affiliate) {
      const name = query.affiliate.toString()
      localStorage.setItem(LOCAL_STORAGE_AFFILIATE_KEY, name)
      setAffiliate(true)
      setAffiliateName(name)
    } else if (savedAffiliateName) {
      setAffiliate(true)
      setAffiliateName(savedAffiliateName)
    }
  }, [query.affiliate])

  return { affiliateName, isAffiliate }
}
