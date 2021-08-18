import { seal, open } from 'tweetnacl-sealedbox-js'
import { box } from 'tweetnacl'
import { parse } from 'papaparse'

import { AppError } from './error'
import { Guest } from './db'

export function binKey(key: string): Uint8Array {
  try {
    return Uint8Array.from(atob(key), (c) => c.charCodeAt(0))
  } catch (error) {
    throw new AppError(error.name, error.message, 10010)
  }
}

export function encrypt(publicKey: string, plain: string): string {
  const input = new TextEncoder().encode(plain)
  const sealed = seal(input, binKey(publicKey))
  const encrypted = btoa(String.fromCharCode.apply(null, sealed))
  return encrypted
}

export function decrypt(
  encrypted: string,
  publicKey: string,
  privateKey: string
): string | undefined {
  const params = [binKey(encrypted), binKey(publicKey), binKey(privateKey)]
  const decrypted = open(...params)
  if (!decrypted) return undefined
  return new TextDecoder().decode(decrypted)
}

export function validatePrivateKey(
  publicKey: string,
  privateKey: string
): boolean {
  const text = 'My voice is my passport'
  const encrypted = encrypt(publicKey, text)
  return text == decrypt(encrypted, publicKey, privateKey)
}

type Keypair = {
  privateKey: string
  publicKey: string
}
export function generateKeys(): Keypair {
  const keyPair = box.keyPair()
  const privateKey = btoa(String.fromCharCode.apply(null, keyPair.secretKey))
  const publicKey = btoa(String.fromCharCode.apply(null, keyPair.publicKey))

  return { privateKey, publicKey }
}

export function base64ToHex(base64: string): string {
  return atob(base64)
    .split('')
    .map((aChar) => {
      return ('0' + aChar.charCodeAt(0).toString(16)).slice(-2)
    })
    .join('')
    .toUpperCase()
}

export function hexToBase64(hex: string): string {
  const hexArray = hex
    .replace(/\r|\n/g, '')
    .replace(/([\da-fA-F]{2}) ?/g, '0x$1 ')
    .replace(/ +$/, '')
    .split(' ')
  const byteString = String.fromCharCode.apply(null, hexArray)
  const base64string = window.btoa(byteString)
  return base64string
}

export function toCSV(guest: Guest): string {
  const values = [
    guest.name,
    guest.phone,
    `${guest.address}, ${guest.postalCode} ${guest.city}`,
    guest.resident,
    guest.providedHealthDocument,
  ]
  const value = values
    .map((v) => JSON.stringify(v)?.replaceAll('\\"', '""'))
    .join(',')
  return value
}

interface DecryptedGuest {
  name: string
  phone: string
  address: string
  resident?: string
  providedHealthDocument?: string
}

export function fromCSV(csv: string): DecryptedGuest {
  const { data: rows } = parse(csv)
  const values = rows[0]
  return {
    name: values[0],
    phone: values[1],
    address: values[2],
    resident: values[3],
    providedHealthDocument: values[4],
  }
}
