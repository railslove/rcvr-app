import { seal } from 'tweetnacl-sealedbox-js'
import { box } from 'tweetnacl'

function binKey(key: string): Uint8Array {
  return Uint8Array.from(atob(key), (c) => c.charCodeAt(0))
}

export function encrypt(publicKey: string, plain: string): string {
  const input = new TextEncoder().encode(plain)
  const sealed = seal(input, binKey(publicKey))
  const encrypted = btoa(String.fromCharCode.apply(null, sealed))
  return encrypted
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
