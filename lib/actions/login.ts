import * as db from '../db'
import * as api from '../api'

export async function login(login: api.PostLogin): Promise<db.Owner> {
  const ownerRes = await api.postLogin(login)
  let owner = await db.getOwner(ownerRes.id)

  // add owner to local db if he doesn't yet exist
  if (!owner) {
    owner = await db.addOwner(ownerRes)
  }

  // update publicKey in api if it exists locally but not in api
  if (owner.publicKey && !ownerRes.publicKey) {
    await api.patchOwner({ publicKey: owner.publicKey })
  }

  // update publicKey locally if it's missing locally but exists in api
  if (!owner.publicKey && ownerRes.publicKey) {
    owner.publicKey = ownerRes.publicKey
    owner = await db.updateOwner(owner)
  }

  return owner
}
