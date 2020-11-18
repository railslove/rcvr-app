import { base64ToHex } from '~lib/crypto'

export const downloadKey = (privateKeyAsBase64: string) => {
  const hex = base64ToHex(privateKeyAsBase64)
  const blob = new Blob([hex], { type: 'text/plain' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  document.body.appendChild(a)
  a.setAttribute('style', 'display: none')
  a.href = url
  a.download = 'rcvr_geheimer_schluessel.txt'
  a.click()
  window.URL.revokeObjectURL(url)
  a.remove()
}
