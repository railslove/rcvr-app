import * as db from '../db'
import * as api from '../api'

export async function signup(signup: api.PostSignup): Promise<db.Owner> {
  const ownerRes = await api.postSignup(signup)
  const owner = await db.addOwner(ownerRes)
  return owner
}
