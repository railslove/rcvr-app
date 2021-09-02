import { useOwner } from '~lib/hooks'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getSessionKey, SessionValue, setSession } from '~lib/services/session'

const AFFILIATE_STORAGE_KEY = 'rcvr_affiliate'

const getSessionAffiliate = () => {
  return getSessionKey(AFFILIATE_STORAGE_KEY)
}

const setSessionAffiliate = <T extends SessionValue>(value: T) => {
  setSession(AFFILIATE_STORAGE_KEY, value)
}

export const useAffiliate = () => {
  const owner = useOwner()
  const { query } = useRouter()

  const ownerData = owner && owner.data
  const [name, setName] = useState<string>()
  const [isAffiliate, setActive] = useState<boolean>(false)

  useEffect(() => {
    // use the owner data if present
    if (ownerData) {
      const { affiliate } = ownerData

      setName(affiliate)
      setActive(affiliate != null)

      return
    }

    const name = query.affiliate ? query.affiliate.toString() : undefined
    const savedName = getSessionAffiliate()

    if (!savedName && query.affiliate) {
      setName(name)
      setActive(true)
      setSessionAffiliate(name)
    } else if (savedName) {
      setName(savedName)
      setActive(true)
    }
  }, [ownerData, query.affiliate])

  return { affiliateName: name, isAffiliate }
}
