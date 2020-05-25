import { useQuery } from 'react-query'
import * as db from '../db'
import * as api from '../api'

async function fetchOwner(): Promise<db.Owner> {
  const ownerRes = await api.getOwner()
  let owner = await db.getOwner(ownerRes.id)

  if (!owner) {
    owner = await db.addOwner(ownerRes)
  }

  // update publicKey in api if it exists locally but not in api
  if (owner.publicKey && !ownerRes.publicKey) {
    await api.patchOwner({ id: owner.id, publicKey: owner.publicKey })
  }

  // update publicKey locally if it's missing locally but exists in api
  if (!owner.publicKey && ownerRes.publicKey) {
    owner.publicKey = ownerRes.publicKey
    owner = await db.updateOwner(owner)
  }

  return owner
}

export function useOwner() {
  return useQuery('owner', fetchOwner, {
    retry: 1,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  })
}
