import { db } from './'

export interface Owner {
  id?: number
  email?: string
  name?: string
  privateKey?: string
  publicKey?: string
  sepaTrial?: boolean
  // temporary publicKey location while setup process is not yet complete
  setupPublicKey?: string
}

export async function getOwner(ownerId: Owner['id']): Promise<Owner> {
  const owner = await db.owners.get(ownerId)
  return owner
}

export async function addOwner(newOwner: Owner): Promise<Owner> {
  await db.owners.add(newOwner)
  const owner = await getOwner(newOwner.id)
  return owner
}

export async function updateOwner(updatedOwner: Owner): Promise<Owner> {
  const { id, ...changes } = updatedOwner
  await db.owners.update(id, changes)
  const owner = await getOwner(id)
  return owner
}
