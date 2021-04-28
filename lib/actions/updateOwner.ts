import { QueryClient } from 'react-query'
import * as db from '../db'
import * as api from '../api'

export async function updateOwner(
  queryClient: QueryClient,
  owner: db.Owner
): Promise<db.Owner> {
  const newOwner = await db.updateOwner({ ...owner })
  await api.patchOwner({ publicKey: owner.publicKey })
  queryClient.invalidateQueries('owner')
  return newOwner
}

// commit temporary setupPublicKey
export async function commitSetupPublicKey(
  queryClient: QueryClient,
  owner: db.Owner
): Promise<db.Owner> {
  // user has confirmed the temporary setupPublicKey..
  // extract it and set it as the real publicKey on front- and backend
  const { setupPublicKey, ...newOwner } = owner
  return await updateOwner(queryClient, {
    ...newOwner,
    publicKey: setupPublicKey,
  })
}
