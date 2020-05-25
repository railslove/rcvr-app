import { parse } from 'papaparse'
import { queryCache } from 'react-query'

import * as crypto from '../crypto'
import * as db from '../db'

interface DecryptionResult {
  data: string[][]
  success: number
  failed: number
}

export async function decrypt(
  text: string,
  privateKey: string,
  owner: db.Owner
): Promise<DecryptionResult> {
  const { data: rows } = parse(text, { delimiter: ',' })

  let correctCount = 0
  let wrongCount = 0

  const decryptedRows = rows.map((row) => {
    const encrypted = row[row.length - 1]
    let decrypted
    try {
      decrypted = crypto.decrypt(encrypted, owner.publicKey, privateKey)
    } catch (error) {
      console.warn(error)
    }

    let newRow = [...row]

    if (!decrypted) {
      wrongCount++
      newRow[row.length - 1] = 'Nicht lesbar, Schlüssel falsch'
    } else {
      correctCount++
      const { data: decryptedCsv } = parse(decrypted, { delimiter: ',' })
      newRow[row.length - 1] = decryptedCsv[0]
      newRow = newRow.flat()
    }

    return newRow
  })

  if (correctCount > 0) {
    await db.updateOwner({ id: owner.id, privateKey })
    queryCache.refetchQueries('owner')
  }

  if (correctCount < 1 && wrongCount > 0) {
    await db.updateOwner({ id: owner.id, privateKey: undefined })
    queryCache.refetchQueries('owner')
  }

  return {
    data: decryptedRows,
    success: correctCount,
    failed: wrongCount,
  }
}
