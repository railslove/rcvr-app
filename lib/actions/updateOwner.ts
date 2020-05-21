import { queryCache } from 'react-query'
import * as db from '../db'
import * as api from '../api'

export async function updateOwner(owner: db.Owner): Promise<db.Owner> {
  const newOwner = await db.updateOwner({ ...owner })
  await api.patchOwner({ publicKey: owner.publicKey })
  queryCache.refetchQueries('owner', { force: true })
  return newOwner
}
