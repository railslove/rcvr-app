import { isFormal } from '~lib/config'
import de from '~pages/qr.de'

const en: typeof de = {
  pageTitle: 'Scan QR code',
  scanCode: 'Scan QR code',

  invalidQRCode1:
    'Warning, this QR code is not part of the RecoverApp. You can open this page, but any data you enter there will be sent to ',

  invalidQRCode2: '.',

  scanCodeArea: isFormal
    ? 'Scan the QR code found in the entrance area.'
    : 'Scan the QR code you find on the table of participating establishments',
}

export default en
