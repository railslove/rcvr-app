import { useQuery } from 'react-query'
import * as db from '../db'
import * as api from '../api'

export type CurrentOwner = db.Owner & api.OwnerRes

async function fetchOwner(): Promise<CurrentOwner> {
  let ownerRes = await api.getOwner()
  let owner = await db.getOwner(ownerRes.id)

  if (!owner) {
    owner = await db.addOwner(ownerRes)
  }

  // update publicKey in api if it exists locally but not in api
  if (owner.publicKey && !ownerRes.publicKey) {
    ownerRes = await api.patchOwner({
      publicKey: owner.publicKey,
    })
  }

  // update publicKey locally if it's missing locally but exists in api
  if (!owner.publicKey && ownerRes.publicKey) {
    owner.publicKey = ownerRes.publicKey
    owner = await db.updateOwner(owner)
  }

  return { ...owner, ...ownerRes }
}

export function useOwner() {
  return useQuery('owner', fetchOwner, {
    retry: 1,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  })
}
